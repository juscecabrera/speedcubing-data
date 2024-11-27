'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import sessionDataJSON from '../data.json'

// Interfaz para una sola sesión (entrada individual)
interface SessionEntry {
  [key: string]: (string | number)[]; 
}

// Interfaz para el conjunto completo de datos de sesión
// interface SessionData {
//   [sessionName: string]: SessionEntry; // Permite múltiples sesiones (session1, session2, etc.)
// }

interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: string | null; // Guarda el ID del TimeCard seleccionado
  setshowDetails: (id: string | null) => void;
  sessionData: SessionEntry;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);

  const sessionData: SessionEntry = sessionDataJSON.session1;

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails, sessionData }}>
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
