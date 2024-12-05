'use client'

// import { useState, useEffect } from 'react';
import TimeCard from './TimeCard'
import { useTimer } from '../app/contexts/TimerContext';

interface SessionData {
  session1: {
    [key: string]: [number, string, string]; // Los datos dentro de session1 tienen la forma [tiempo, scramble, fecha]
  };
}

const Times = () => {
  const { isRunning, sessionData } = useTimer()
  
  const lastFiveEntries = Object.entries(sessionData || {}).slice(-5).reverse();

  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      {isRunning ? <></>
      :
      <div className='flex flex-row'>
        {lastFiveEntries.map(([key, value]) => (
          <TimeCard key={key} id={key} data={value}/>
        ))}
        {JSON.stringify(sessionData)}
      </div>
      }

    </div>
  )
}

export default Times