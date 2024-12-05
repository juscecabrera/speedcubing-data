'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
  
interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: string | null;
  setshowDetails: (id: string | null) => void;
  sessionData: any[];  // Cambiado a array
  setSessionData: (data: any[]) => void;
  showStats: boolean;
  setshowStats: (running: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getData`)
      const data = await response.json()

      setSessionData(data)
    };
    
    fetchData();
  }, []); 

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails, sessionData, setSessionData, showStats, setshowStats }}>
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
