'use client'

import TimeCard from './TimeCard'
import { useTimer } from '../app/contexts/TimerContext';

const Times = () => {
  const { isRunning, sessionData, isSpacePressed } = useTimer()

  const solves = sessionData?.solves
  
  const lastFiveEntries = Object.entries(solves || {}).slice(-5).reverse();

  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      {isRunning || isSpacePressed ? <></>
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