'use client'

import React from 'react'
import clipboard from '../app/svg/clipboard.svg'
import deleteLogo from '../app/svg/delete.svg'
import arrowSmall from '../app/svg/arrowSmall.svg'
import Image from 'next/image'
import { useTimer } from '../app/contexts/TimerContext';

interface TimeCardDetailProps {
    id: string;
    time: number;
    scramble: string;
    date: string;
  }


const TimeCardDetail = ({ id, time, scramble, date }: TimeCardDetailProps ) => {
  const { setshowDetails } = useTimer()

  const handleClose = () => setshowDetails(null);

  return (
    <>
        <div className='text-black fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black bg-opacity-30 z-10'>
            <div className='bg-white w-[344px] h-[467px] rounded-[20px] border-2 border-black flex flex-col justify-between items-center p-5 text-center'>
                <p className='text-2xl border-black border-b-2 w-1/2'>{id}</p>
                <p className='text-4xl'>{time}</p>
                <p className='text-md'>{scramble}</p>
                <p className='text-lg'>{date}</p>


                <div className='flex flex-row gap-5'>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button 
                        onClick={() => {}}>
                            <Image src={clipboard} alt='clipboard logo'/>
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button 
                            onClick={() => {}}>
                            <p>DNF</p>
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button 
                            onClick={() => {}}>
                            <p>OK</p>
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button 
                            onClick={() => {}}>
                            <p>+2</p>
                        </button>
                    </div>
                </div>

                <div className='flex flex-row gap-3'>
                    <button className='flex items-center justify-center bg-red-500 w-12 h-10 border-black border-[1px] rounded-[15px]'>
                        <Image src={deleteLogo} alt='delete logo' />
                        {/* <p>ELIMINAR</p> */}
                        {/* La x parece que es para cerrar la ventana pero es para borra el solve */}
                    </button>

                    <button 
                        className='flex items-center justify-center bg-speedblue w-12 h-10 border-black border-[1px] rounded-[15px]'
                        onClick={handleClose}    
                    >
                        <Image src={arrowSmall} alt='ok logo' />
                    </button>

                </div>
            </div>
        </div>
    </>
  )
}

export default TimeCardDetail