'use client'
import { DeleteButton } from '@/components/DeleteButton';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of your context open
interface MyContextType {
  open: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an undefined default open
const GlobalContext = createContext<MyContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [open, setAlert] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ open, setAlert }}>
      {open && <DeleteButton />}
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
