'use client'
import React, { createContext, useReducer, ReactNode, useContext, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Sidebar from '@/components/ui/sidebar';
import SidebarCard from '@/components/SidebarCard';
import { SheetCard } from '@/components/SheetCard';

// Define the shape of your context state
interface MyContextState {
  carts: Product[];
  sidebar: boolean
  token: string | null
}

// Define the shape of your actions
type Action =
  | { type: 'ADD_CART', payload: Product }
  | { type: 'REMOVE_CART', payload: string }
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'LOGIN', payload: string }
  | { type: 'LOGOUT' }

// Create the context with an undefined default state
const GlobalContext = createContext<
  { state: MyContextState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Define the initial state
const initialState: MyContextState = {
  carts: Cookies.get('carts') ? JSON.parse(Cookies.get('carts')!) : [],
  sidebar: false,
  token: localStorage.getItem('token'),
};

// Define the reducer function
const reducer = (state: MyContextState, action: Action): MyContextState => {
  switch (action.type) {
    case 'ADD_CART':
      const updatedCarts = [...state.carts, action.payload];
      Cookies.set('carts', JSON.stringify(updatedCarts), { expires: 7 });
      return { ...state, sidebar: true, carts: updatedCarts };
    case 'REMOVE_CART':
      const filteredCarts = state.carts.filter(item => item.id !== action.payload); // Assuming item has an 'id' field
      Cookies.set('carts', JSON.stringify(filteredCarts), { expires: 7 });
      return { ...state, carts: filteredCarts };
    case 'OPEN_SIDEBAR':
      return { ...state, sidebar: true };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebar: false };
    case 'LOGIN':
      const token = action.payload
      localStorage.setItem('token', token)
      return { ...state, token: token };
    case 'LOGOUT':
      localStorage.removeItem('token')
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

  const onCloseSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch])
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
