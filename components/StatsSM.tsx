'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import arrow from '../app/svg/arrow.svg'
import { useTimer } from '../app/contexts/TimerContext';
import Stats from './Stats';
import { averageOfN } from '@/utils/generateStats';
import { useSession } from 'next-auth/react';


const StatsSM = () => {
  const { isRunning, isSpacePressed, showStats, setshowStats, sessionData, setSessionData, fetchSessionData, userSessionsData, userSessions } = useTimer()
  const {data: session} = useSession()

  const handleStats = () => {
    setshowStats(true)
  };

  const totalSolves = sessionData ? sessionData.solves.length as number : 0

  const ao5 = sessionData ? averageOfN(sessionData, 5) : ''
  const ao12 = sessionData ? averageOfN(sessionData, 12) : ''
  const ao100 = sessionData ? averageOfN(sessionData, 100) : ''
  const averageSession = sessionData ? averageOfN(sessionData,totalSolves) : ''

  useEffect(() => {
    let userEmail = session?.user?.email as string
    userSessions(userEmail)
  
  }, [session])
  

  //CREAR SESSION
  const createSession = async () => { 
    let userEmail = session?.user?.email
    try {
        //1. CREA LA SESION
        const response = await fetch('/api/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionName: 'Session 4',
            userEmail
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create session');
        }
        
        const sessionId = await response.json()

        //2. CAMBIA LOS SOLVES A LA NUEVA SESSION
        if (sessionId) fetchSessionData(sessionId.toString())
            
        console.log('Session created successfully');
      } catch (error) {
        console.error('Error adding session:', error);
      }
  }

  const handleSessionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === "Create Session") {
      createSession();
    } else {
      fetchSessionData(event.target.value)
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
                {userSessionsData.map((session, key) => (
                  <option key={key} value={session._id}>
                    {session.name}
                  </option>
                ))}
                    <option value="Create Session" className='text-green-700 text-center'>+</option>
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