'use client'

import { useState, useRef, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';

const Main = () => {
  const [time, setTime] = useState<number>(0);
  const [scramble, setScramble] = useState<string>('');
  const [previousScramble, setPreviousScramble] = useState<string>('');
  const { isRunning, setIsRunning, sessionData } = useTimer()
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
  

  const startStopTimer = () => {
    if (isRunning) {
      
      const recordedTime = solveRef.current
      const storedData = localStorage.getItem('cubingData');

      if (storedData) {

        const actualDate = new Date(Date.now())
        const formattedDate = `${actualDate.getDate()} ${actualDate.toLocaleString('es-ES', { month: 'short' })} ${actualDate.getFullYear()}, ${actualDate.getHours().toString().padStart(2, '0')}:${actualDate.getMinutes().toString().padStart(2, '0')}:${actualDate.getSeconds().toString().padStart(2, '0')}hrs`;

        const cubingData = JSON.parse(storedData);
        const newTime = [recordedTime / 1000, scramble, formattedDate];
        
        const nextIndex = Object.keys(cubingData.session1).length + 1;
        //cambiar esto para cada session
        cubingData.session1[nextIndex] = newTime;
        
        localStorage.setItem('cubingData', JSON.stringify(cubingData));

        // Generar un nuevo scramble al detener el timer
        const newScramble = generateScramble();
        setScramble(newScramble);
        setPreviousScramble(newScramble); // Actualizamos el scramble anterior


        if (timerRef.current) clearInterval(timerRef.current);
      }
    } else {
        setTime(0);
        solveRef.current = 0;
        const startTime = Date.now();

        timerRef.current = setInterval(() => {
          const currentTime = Date.now() - startTime;
          setTime(currentTime);
          solveRef.current = currentTime; // Actualiza la referencia del tiempo
        }, 10);
    }
    setIsRunning(!isRunning);
  };

  // Capturar evento de teclado
  useEffect(() => {
    //agregar que tiene que mantener presionado y al soltarlo es cuando empieza
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
  2. (LISTO) Si el temporizador esta corriendo, cambiar la interfaz
  3. Si se para el temporizador, 
    (LISTO) volver a la interfaz anterior, 
    cambiar el scramble, 
    (LISTO) mostrar el tiempo, 
    (LISTO)registrar el tiempo en la bd, 
    (LISTO)crear una nueva timecard 
  */


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-16'>
        {/* Scramble */}
        {isRunning
        ? <p></p>
        : <p className='text-3xl'>{scramble}</p> }

        {/* Tiempo */}
        <h1 className="text-8xl ">{formatTime(time)}</h1>
      </div>
    </div>
  )
}

export default Main