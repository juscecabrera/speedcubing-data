'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Session {
  _id: string;
  name: string;
}

//Este es el array con los solves del modelo de mongodb
interface Solve {
  solveTime: number;
  scramble: string;
  date: string;
}

//Este es el modelo de mongodb
interface SessionData {
  _id: string;
  name: string;
  solves: Solve[];
  createdAt: string;
  updatedAt: string;
}

interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  showDetails: string | null;
  setshowDetails: (id: string | null) => void;
  sessionData: SessionData | null;
  setSessionData: (data: SessionData) => void;
  setIsSpacePressed: (running: boolean) => void;
  isSpacePressed: boolean;
  showStats: boolean;
  setshowStats: (running: boolean) => void;
  fetchSessionData: (params?: string) => Promise<void>;
  userSessionsData: Session[];
  userSessions: (params?: string) => Promise<void>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [userSessionsData, setUserSessionsData] = useState<Session[]>([])

  /* Aunque de repente puedo hacer para que los ultimos tiempos esten en un estado para facilitar el proceso de addSolve */

  const userSessions = async (params?: object | string) => {
    try {
      const url = `/api/getData/users/${params}`
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      setUserSessionsData(data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  const fetchSessionData = async (params?: string) => {
    try {
      const url = params ? `/api/getData/${params}` : `/api/getData`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      setSessionData(data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  useEffect(() => {
    fetchSessionData()
  }, []); 

  return (
    <TimerContext.Provider value={{ 
      isRunning, 
      setIsRunning, 
      showDetails, 
      setshowDetails, 
      sessionData, 
      setSessionData, 
      showStats, 
      setshowStats, 
      isSpacePressed, 
      setIsSpacePressed,
      fetchSessionData,
      userSessionsData,
      userSessions
    }}>
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
