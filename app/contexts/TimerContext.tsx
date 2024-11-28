'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

// Interfaz para una sola sesión (entrada individual)
// interface SessionEntry {
//   [key: string]: (string | number)[]; 
// }

// Interfaz para el conjunto completo de datos de sesión
// interface SessionData {
//   [sessionName: string]: SessionEntry; // Permite múltiples sesiones (session1, session2, etc.)
// }

interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: string | null; // Guarda el ID del TimeCard seleccionado
  setshowDetails: (id: string | null) => void;
  sessionData: string | null;
  showStats: boolean;
  setshowStats: (running: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);


  const storedData = localStorage.getItem('cubingData');

  if (!storedData) {
    //si no hay data, inicializarla
    const cubingData = {session1: {}}
    localStorage.setItem('cubingData', JSON.stringify(cubingData))
  } 

  const sessionData: string = storedData ? storedData : JSON.stringify({ session1: {} });

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails, sessionData, setshowStats, showStats }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
