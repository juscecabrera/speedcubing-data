'use client'

import Image from 'next/image'
import arrowDown from '../svg/arrowDown.svg'
import arrow from '../svg/arrow.svg'
import { useTimer } from '../contexts/TimerContext';
import Stats from './Stats';



const StatsSM = () => {
  const { isRunning, showStats, setshowStats, sessionData  } = useTimer()

  const handleStats = () => {
    setshowStats(true)
  };

   // Comprobar que sessionData no es null antes de pasarlo a Stats
   const validSessionData = sessionData ? JSON.parse(sessionData) : null;

  return (
    <div className='text-black bg-transparent'>
        {isRunning
        ? <></>
        : 
        <div className='absolute bottom-0 left-0 flex flex-col items-center w-60 h-[380px] bg-white border-black border-2 rounded-r-[20px] p-4'>
            <div className='my-4 rounded-3xl border-2 border-black w-full h-10 flex justify-between items-center px-4'>
            <p>Sesion 1 </p>
                <Image src={arrowDown} alt='arrowdown' className='col-start-3 col-end-3'/>
            </div>
            <p className='text-2xl'>599/598</p>
            <div className='bg-black h-[1px] w-full'></div>

            <div className='flex flex-col gap-4 items-center p-4 text-2xl'>
                <p>avg 10.85</p>
                <p>a5 12.25</p>
                <p>a12 11.11</p>
                <p>a100 10.78</p>
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

        {showStats && validSessionData ? (
            <Stats setshowStats={setshowStats} sessionData={validSessionData} />
        ) : (
            <></>
        )}
    </div>
  )
}

export default StatsSM