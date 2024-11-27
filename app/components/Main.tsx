'use client'

import { useState, useRef, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';

const Main = () => {
  const [time, setTime] = useState<number>(0);
  const { isRunning, setIsRunning } = useTimer()
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startStopTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      //aca va la logica de guardar el solve
      
    } else {
      setTime(0);
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // Capturar evento de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); 
        startStopTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  /*
  Funcionalidad basica:
  1. (LISTO) Si el temporizador esta parado, al presionar se tiene que: reiniciar el contador e iniciar nuevamente
  2. Si el temporizador esta corriendo, cambiar la interfaz
  3. Si se para el temporizador, volver a la interfaz anterior, cambiar el scramble, mostrar el tiempo, registrar el tiempo en la bd, crear una nueva timecard 
  */


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-16'>
        {/* Scramble */}
        {isRunning
        ? <p></p>
        : <p className='text-3xl'>U R2 B2 F2 U ’ R2 B2 U2 F2 U’ L2 U L R’ U B’ L R2 B’ R F</p> }

        {/* Tiempo */}
        <h1 className="text-8xl ">{formatTime(time)}</h1>
      </div>
    </div>
  )
}

export default Main