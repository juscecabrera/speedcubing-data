'use client'

import Image from 'next/image'
import arrow from '../svg/arrow.svg'
import { useTimer } from '../contexts/TimerContext'

const TimeCard = () => {
  const { setshowDetails } = useTimer()

  return (
    <div className='bg-white rounded-[20px] w-40 h-56 border-2 border-black flex flex-col justify-between items-center p-4'>
        
        {/* El numero de tiempo */}
        <div className='flex flex-col items-center w-full'>
            <p className='text-black text-2xl'>599</p>
            <div className='bg-black h-[1px] w-full'></div>
        </div>

        {/* Tiempo */}
        <p className='text-black text-2xl'>12.30</p>

        {/* Boton */}
        <button 
          onClick={() => setshowDetails(true)}
          className='bg-speedblue border-2 border-black rounded-[20px] w-full h-10 flex justify-center items-center'
        >
          <Image 
              src={arrow}
              alt='arrow'
              width={40}
          />
        </button>

    </div>
  )
}

export default TimeCard