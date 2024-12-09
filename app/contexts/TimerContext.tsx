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
  sessionData: SessionData | null;
  setSessionData: (data: SessionData) => void;
  setIsSpacePressed: (running: boolean) => void;
  isSpacePressed: boolean;
  showStats: boolean;
  setshowStats: (running: boolean) => void;
  fetchSessionData: (params?: string) => Promise<void>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showDetails, setshowDetails] = useState<string | null>(null);
  const [showStats, setshowStats] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);


  //La mejor manera seria hacer el fetch en context y luego darle la funcion a los otros componentes. De esta manera tengo:
  /**
   * 1. Main: add solve y luego hacer el fetch
   * 2. StatsSM: crear sesion y hacer el fetch
   * 3. TimerContext: hacer el fetch apenas inicia la sesion, luego hacerlo cada que agregas un nuevo tiempo. Aunque de repente puedo hacer para que los ultimos tiempos esten en un estado para facilitar el proceso de addSolve
   */


  const fetchSessionData = async (params?: string) => {
    try {
      const url = params ? `/api/getData/${params}` : `/api/getData`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      //el id de la session es data._id
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
      fetchSessionData
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
