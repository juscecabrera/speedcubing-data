'use client'

import Image from 'next/image'
import arrowDown from '../app/svg/arrowDown.svg'
import arrow from '../app/svg/arrow.svg'
import { useTimer } from '../app/contexts/TimerContext';
import Stats from './Stats';
import { averageOfN } from '@/utils/generateStats';

const StatsSM = () => {
  const { isRunning, isSpacePressed, showStats, setshowStats, sessionData } = useTimer()

  const handleStats = () => {
    setshowStats(true)
  };

  const totalSolves = sessionData?.solves.length as number


  const ao5 = sessionData ? averageOfN(sessionData, 5) : ''
  const ao12 = sessionData ? averageOfN(sessionData, 12) : ''
  const ao100 = sessionData ? averageOfN(sessionData, 100) : ''
  const averageSession = sessionData ? averageOfN(sessionData,totalSolves) : ''

  return (
    <div className='text-black bg-transparent'>
        {isRunning || isSpacePressed
        ? <></>
        : 
        <div className='absolute bottom-0 left-0 flex flex-col items-center w-60 h-[380px] bg-white border-black border-2 rounded-r-[20px] p-4'>
            <div className='my-4 rounded-3xl border-2 border-black w-full h-10 flex justify-between items-center px-4'>
            <p>Sesion 1 </p>
                <Image src={arrowDown} alt='arrowdown' className='col-start-3 col-end-3'/>
            </div>
            <p className='text-2xl'>{totalSolves}</p>
            <div className='bg-black h-[1px] w-full'></div>

            <div className='flex flex-col gap-4 items-center p-4 text-2xl'>
                <p>avg {averageSession}</p>
                <p>a5 {ao5}</p>
                <p>a12 {ao12}</p>
                <p>a100 {ao100}</p>
            </div>

            <button 
                className='bg-speedblue border-2 border-black rounded-[20px] w-32 h-10 flex justify-center items-center'
                onClick={handleStats}
            >
                <Image 
                    src={arrow}
                    alt='arrow'
                    width={40}
                />
            </button>       
            
        </div>
        }

        {showStats && sessionData ? (
            <Stats setshowStats={setshowStats} sessionData={sessionData} />
        ) : (
            <></>
        )}
    </div>
  )
}

export default StatsSM