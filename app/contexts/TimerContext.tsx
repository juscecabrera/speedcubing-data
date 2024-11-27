'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define el tipo de datos del contexto
interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: boolean,
  setshowDetails: (running: boolean) => void;
}

// 2. Crea el contexto
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// 3. Crea el proveedor del contexto
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<boolean>(false)


  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails }}>
      {children}
    </TimerContext.Provider>
  );
};

// 4. Hook personalizado para usar el contexto más fácilmente
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
