'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  addTime: (newTime: any) => void; // Nueva función para agregar tiempos
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<string | null>(null);
  
  useEffect(() => {
    // Solo accedemos a localStorage en el cliente (navegador)
    if (typeof window !== 'undefined') {
      let storedData = localStorage.getItem('cubingData');
      
      if (!storedData) {
        // Si no hay datos, inicializamos localStorage
        const cubingData = { session1: {} };
        localStorage.setItem('cubingData', JSON.stringify(cubingData));
        storedData = JSON.stringify(cubingData);
      }

      setSessionData(storedData);
    }
  }, []);

  const addTime = (newTime: any) => {
    const storedData = localStorage.getItem('cubingData');
    if (storedData) {
      const cubingData = JSON.parse(storedData);
      const nextIndex = Object.keys(cubingData.session1).length + 1;
      cubingData.session1[nextIndex] = newTime;
      localStorage.setItem('cubingData', JSON.stringify(cubingData));
    }
  };

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails, sessionData, setshowStats, showStats, addTime }}>
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
