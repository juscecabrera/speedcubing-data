'use client'

import TimeCard from './TimeCard'
import { useTimer } from '../contexts/TimerContext';

interface SessionData {
  session1: {
    [key: string]: [number, string, string]; // Los datos dentro de session1 tienen la forma [tiempo, scramble, fecha]
  };
}

const Times = () => {
  const { isRunning, sessionData } = useTimer()
  
  // Verificar que sessionData no es null o undefined antes de hacer el parse
  let sessionDataJSON: SessionData = { session1: {} };
  if (sessionData) {
    try {
      sessionDataJSON = JSON.parse(sessionData);
    } catch (error) {
      console.error('Error al parsear sessionData:', error);
    }
  }
  
  // Obtener las últimas 5 entradas
  const lastFiveEntries = Object.entries(sessionDataJSON.session1 || {}).slice(-5).reverse();

  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      {isRunning ? <></>
      :
      <div className='flex flex-row'>
        {lastFiveEntries.map(([key, value]) => (
          <TimeCard key={key} id={key} data={value}/>
        ))}
      </div>
      }

    </div>
  )
}

export default Times