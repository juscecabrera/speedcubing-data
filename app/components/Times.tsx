'use client'

import TimeCard from './TimeCard'
import { useTimer } from '../contexts/TimerContext';

const Times = () => {
  const { isRunning, sessionData } = useTimer()

  const lastFiveEntries = Object.entries(sessionData).slice(-5).reverse();

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