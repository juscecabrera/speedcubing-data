'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

//Este es el array con los solves del modelo de mongodb
interface Solve {
  solveTime: number;
  scramble: string;
  date: string;
}

//Este es el modelo de mongodb
interface SessionData {
  _id: string;
  solves: Solve[];
  createdAt: string;
  updatedAt: string;
}

interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: string | null;
  setshowDetails: (id: string | null) => void;
  sessionData: SessionData | null; // Changed to a single object
  setSessionData: (data: SessionData) => void;
  setIsSpacePressed: (running: boolean) => void;
  isSpacePressed: boolean;
  showStats: boolean;
  setshowStats: (running: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getData`)
      const data = await response.json()

      setSessionData(data)
    };
    
    fetchData();
  }, []); 

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, showDetails, setshowDetails, sessionData, setSessionData, showStats, setshowStats, isSpacePressed, setIsSpacePressed }}>
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
