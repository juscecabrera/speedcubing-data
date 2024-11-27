'use client'

import TimeCard from './TimeCard'
import { useTimer } from '../contexts/TimerContext';


const Times = () => {
  const { isRunning, setIsRunning } = useTimer()


  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      {isRunning ? <></>
      :

      <div className='flex flex-row'>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
      </div>
      }

    </div>
  )
}

export default Times