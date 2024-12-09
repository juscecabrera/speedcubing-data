'use client'

import Image from 'next/image'
import arrow from '../app/svg/arrow.svg'
import { useTimer } from '../app/contexts/TimerContext';
import Stats from './Stats';
import { averageOfN } from '@/utils/generateStats';

const StatsSM = () => {
  const { isRunning, isSpacePressed, showStats, setshowStats, sessionData, setSessionData } = useTimer()

  const handleStats = () => {
    setshowStats(true)
  };

//   const totalSolves = sessionData ? sessionData.solves.length as number : 0
  const totalSolves = 0


//   const ao5 = sessionData ? averageOfN(sessionData, 5) : ''
//   const ao12 = sessionData ? averageOfN(sessionData, 12) : ''
//   const ao100 = sessionData ? averageOfN(sessionData, 100) : ''
//   const averageSession = sessionData ? averageOfN(sessionData,totalSolves) : ''

  const ao5 = 0
  const ao12 = 0
  const ao100 = 0
  const averageSession = 0


  const createSession = async () => { 
    try {
        const response = await fetch('/api/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionName: 'Probando'
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create session');
        }
        
        const sessionId = await response.json()

        const fetchNewData = async () => {
          const response = await fetch(`/api/getData/${sessionId.toString()}`);
          const data = await response.json();
    
          console.log(data)
          setSessionData(data);
        };
    
        if (sessionId) fetchNewData();
    
        console.log('Session created successfully');
      } catch (error) {
        console.error('Error adding session:', error);
      }
  }

  const handleSessionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === "New Session") {
      createSession();
    }
  };

  return (
    <div className='text-black bg-transparent'>
        {isRunning || isSpacePressed
        ? <></>
        : 
        <div className='absolute bottom-0 left-0 flex flex-col items-center w-60 h-[380px] bg-white border-black border-2 rounded-r-[20px] p-4'>
            <div className='my-4 rounded-3xl border-2 border-black w-full h-10 flex justify-center items-center px-4'>
                
                <select name="sessions" id="sessions" onChange={handleSessionChange}>
                    <option value="Session">Session 1</option>
                    <option value="New Session">New Session</option>
                </select>

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