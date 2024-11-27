'use client'

import TimeCard from './TimeCard'
import { useTimer } from '../contexts/TimerContext';

const Times = () => {
  const { isRunning, sessionData } = useTimer()

  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      {isRunning ? <></>
      :
      <div className='flex flex-row'>
        {Object.entries(sessionData).map(([key, value]) => (
          <TimeCard key={key} id={key} data={value}/>
        ))}
      </div>
      }

    </div>
  )
}

export default Times