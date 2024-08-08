'use client'

import React, { createContext, useReducer, ReactNode, useContext, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { SheetCard } from '@/components/SheetCard';

// Define the shape of your context state
interface MyContextState {
  carts: ProductCard[];
  sidebar: boolean;
  token: string | null;
}

// Define the shape of your actions
type Action =
  | { type: 'ADD_CART', payload: Product }
  | { type: 'REMOVE_CART', payload: string }
  | { type: 'INCREASE_QUANTITY', payload: string }
  | { type: 'DECREASE_QUANTITY', payload: string }
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'LOGIN', payload: string }
  | { type: 'LOGOUT' };

// Create the context with an undefined default state
const GlobalContext = createContext<
  { state: MyContextState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Define the initial state
const initialState: MyContextState = {
  carts: Cookies.get('carts') ? JSON.parse(Cookies.get('carts')!) : [],
  sidebar: false,
  token: null, // Initially set to null
};

// Define the reducer function
const reducer = (state: MyContextState, action: Action): MyContextState => {
  const expires = new Date(Date.now() + 3 * 24 * 60 * 1000) // 3 days expired
  switch (action.type) {
    case 'ADD_CART':
      const existingCartItem = state.carts.find(item => item._id === action.payload._id);
      let updatedCarts;
      if (existingCartItem) {
        updatedCarts = state.carts.map(item =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCarts = [...state.carts, { ...action.payload, quantity: 1 }];
      }
      Cookies.set('carts', JSON.stringify(updatedCarts), { expires });
      return { ...state, sidebar: true, carts: updatedCarts };
    case 'REMOVE_CART':
      const filteredCarts = state.carts.filter(item => item._id !== action.payload);
      Cookies.set('carts', JSON.stringify(filteredCarts), { expires });
      return { ...state, carts: filteredCarts };
    case 'INCREASE_QUANTITY':
      const increasedCart = state.carts.map(item =>
        item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      Cookies.set('carts', JSON.stringify(increasedCart), { expires });
      return { ...state, carts: increasedCart };
    case 'DECREASE_QUANTITY':
      const decreasedCart = state.carts.map(item =>
        item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0); // Remove item if quantity is 0
      Cookies.set('carts', JSON.stringify(decreasedCart), { expires });
      return { ...state, carts: decreasedCart };
    case 'OPEN_SIDEBAR':
      return { ...state, sidebar: true };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebar: false };
    case 'LOGIN':
      const token = action.payload;
      localStorage.setItem('token', token);
      return { ...state, token: token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, token: null };
    default:
      const exhaustiveCheck = action as Action;
      throw new Error(`Unhandled action type: ${exhaustiveCheck.type}`);
  }
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load token from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN', payload: token });
    }
  }, []);

  const onCloseSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <SheetCard open={state.sidebar} onChangeModal={onCloseSidebar} data={state.carts} />
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export { GlobalProvider, GlobalContext, useGlobalContext };
