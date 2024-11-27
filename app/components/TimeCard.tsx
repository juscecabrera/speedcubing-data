'use client'

import Image from 'next/image'
import arrow from '../svg/arrow.svg'
import { useTimer } from '../contexts/TimerContext'
import TimeCardDetail from './TimeCardDetail'

interface TimeCardProps {
  id: string;
  data: (string | number)[];
}


const TimeCard: React.FC<TimeCardProps> = ({ id, data }) => {
  const { showDetails, setshowDetails } = useTimer()

  const time = data[0] as number;
  const scramble = data[1] as string;
  const date = data[2] as string;


  const handleDetailClick = () => {
    // Mostrar el detalle del TimeCard específico o cerrar si ya está abierto
    setshowDetails(showDetails === id ? null : id);
  };

  return (
    <div className='bg-white rounded-[20px] w-40 h-56 border-2 border-black flex flex-col justify-between items-center p-4'>
        
        {/* El numero de tiempo */}
        <div className='flex flex-col items-center w-full'>
            <p className='text-black text-2xl'>{id}</p>
            <div className='bg-black h-[1px] w-full'></div>
        </div>

        {/* Tiempo */}
        <p className='text-black text-2xl'>{time}</p>

        {/* Boton */}
        <button 
          onClick={handleDetailClick}
          className='bg-speedblue border-2 border-black rounded-[20px] w-full h-10 flex justify-center items-center'
        >
          <Image 
              src={arrow}
              alt='arrow'
              width={40}
          />
        </button>

      {/* Renderiza TimeCardDetail solo si el ID coincide */}
      {showDetails === id && (
        <TimeCardDetail id={id} time={time} scramble={scramble} date={date} />
      )}
    </div>
  )
}

export default TimeCard