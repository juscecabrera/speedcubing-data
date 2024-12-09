'use client'

import { useState, useRef, useEffect } from 'react';
import { useTimer } from '../app/contexts/TimerContext';
import { generateScramble, formatTime } from '@/utils/generateScramble';

const Main = () => {
  const [time, setTime] = useState<number>(0);
  const [scramble, setScramble] = useState<string>('');
  const [previousScramble, setPreviousScramble] = useState<string>('');
  const { isRunning, setIsRunning, setSessionData } = useTimer()
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const solveRef = useRef<number>(0)
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const scrambleForSolve = generateScramble()
    setScramble(scrambleForSolve)
    setPreviousScramble(scrambleForSolve);
  }, [])

  /*
  Creo que para mejorar la UX tengo que hacer que las TimeCard sean con estado puro del navegador, se actualice eso, luego la UX y al final la base de datos, porque al esperar a que haga la llamada otra vez y perjudique la UX no me gusta
  */
  
  const startStopTimer = async () => {
    if (isRunning) {

      // Reiniciar el temporizador y scramble
      const newScramble = generateScramble();
      setScramble(newScramble);
      setPreviousScramble(newScramble);
      if (timerRef.current) clearInterval(timerRef.current);

      const recordedTime = solveRef.current / 1000;
      const actualDate = new Date();
      const formattedDate = `${actualDate.getDate()} ${actualDate.toLocaleString('es-ES', { month: 'short' })} ${actualDate.getFullYear()}, ${actualDate.getHours().toString().padStart(2, '0')}:${actualDate.getMinutes().toString().padStart(2, '0')}:${actualDate.getSeconds().toString().padStart(2, '0')}hrs`;
  
      try {
        const response = await fetch('/api/addSolve', 
        {
          method: 'POST',
          body: JSON.stringify({
            solveTime: recordedTime,
            scramble: previousScramble,
            date: formattedDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add solve');
        }

        const fetchData = async () => {
          const response = await fetch(`/api/getData`)
          const data = await response.json()
    
          setSessionData(data)
        };
        
        fetchData();

        console.log('Solve added successfully');
      } catch (error) {
        console.error('Error adding solve:', error);
      }
      
    } else {
      setTime(0);
      solveRef.current = 0;
      const startTime = Date.now();
  
      timerRef.current = setInterval(() => {
        const currentTime = Date.now() - startTime;
        setTime(currentTime);
        solveRef.current = currentTime;
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // Detectar cuando la barra espaciadora es presionada y mantenida
   // Detectar cuando la barra espaciadora es presionada y mantenida
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        if (!isSpacePressed) {
          console.log("Espacio presionado");
          setIsSpacePressed(true);
          setIsRunning(true)
          if (isRunning) {
            setIsRunning(false)
            startStopTimer()
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setIsSpacePressed(false); 
        console.log("Espacio liberado");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed]); 


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-16'>
        {isRunning ? <></> : <p className='text-3xl'>{scramble}</p> }
        <h1 className={`text-8xl ${isSpacePressed ? "text-red-600" : "text-white"}`}>{formatTime(time)}</h1>
      </div>
    </div>
  )
}

export default Main