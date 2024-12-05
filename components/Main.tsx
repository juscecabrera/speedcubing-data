'use client'

import { useState, useRef, useEffect } from 'react';
import { useTimer } from '../app/contexts/TimerContext';

const Main = () => {
  const [time, setTime] = useState<number>(0);
  const [scramble, setScramble] = useState<string>('');
  const [previousScramble, setPreviousScramble] = useState<string>('');
  const { isRunning, setIsRunning } = useTimer()
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const solveRef = useRef<number>(0)

  //generar scrambles aleatorios y asignarlos
  const generateScramble = (length = 20): string => {
    const moves = ["R", "L", "U", "D", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    let lastMove = "";
  
    for (let i = 0; i < length; i++) {
      let move = moves[Math.floor(Math.random() * moves.length)];
  
      // Evitar movimientos consecutivos en la misma cara
      while (move === lastMove) {
        move = moves[Math.floor(Math.random() * moves.length)];
      }
  
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble += `${move}${modifier} `;
      lastMove = move;
    }
  
    return scramble.trim(); // Elimina el espacio final
  };

  useEffect(() => {
    const scrambleForSolve = generateScramble()
    setScramble(scrambleForSolve)
    setPreviousScramble(scrambleForSolve);
  }, [])
  

  const startStopTimer = async () => {
    if (isRunning) {
      const recordedTime = solveRef.current / 1000;  // Convertir ms a segundos
      const actualDate = new Date();
      const formattedDate = `${actualDate.getDate()} ${actualDate.toLocaleString('es-ES', { month: 'short' })} ${actualDate.getFullYear()}, ${actualDate.getHours().toString().padStart(2, '0')}:${actualDate.getMinutes().toString().padStart(2, '0')}:${actualDate.getSeconds().toString().padStart(2, '0')}hrs`;
  
      try {
        const response = await fetch('/api/addSolve', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Importante
          },
          body: JSON.stringify({
            userId: 'user123',  // Reemplaza con el ID real del usuario
            solveTime: recordedTime,
            scramble: previousScramble,
            date: formattedDate,
          }),
        });
        
  
        if (!response.ok) {
          throw new Error('Failed to add solve');
        }
  
        console.log('Solve added successfully');
      } catch (error) {
        console.error('Error adding solve:', error);
      }
  
      // Reiniciar el temporizador y scramble
      const newScramble = generateScramble();
      setScramble(newScramble);
      setPreviousScramble(newScramble);
      
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      // Inicia el temporizador
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

 // Capturar evento de teclado
 useEffect(() => {
  // Aseguramos que este código solo se ejecute en el navegador
  if (typeof window !== 'undefined') {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        startStopTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }
}, [isRunning]);

  // Formatear el tiempo en minutos:segundos
  const formatTime = (ms: number) => {
    const totalSeconds = ms / 1000;
    if (totalSeconds < 60) {
      return totalSeconds.toFixed(2); // Muestra solo segundos si es menor a 60
    } else {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = (totalSeconds % 60).toFixed(2);
      return `${minutes}:${seconds.padStart(5, '0')}`; // Muestra minutos:segundos
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-16'>
        {isRunning ? <></> : <p className='text-3xl'>{scramble}</p> }
        <h1 className="text-8xl ">{formatTime(time)}</h1>
      </div>
    </div>
  )
}

export default Main