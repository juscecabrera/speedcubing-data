'use client'

import React from 'react'
import clipboard from '../svg/clipboard.svg'
import deleteLogo from '../svg/delete.svg'
import arrowSmall from '../svg/arrowSmall.svg'
import Image from 'next/image'
import { useTimer } from '../contexts/TimerContext';


const TimeCardDetail = () => {
  const { showDetails, setshowDetails } = useTimer()


  return (
    <>
        {showDetails ?
        <div className='text-black absolute w-full h-full flex justify-center items-center top-0 left-0 bg-black bg-opacity-30'>
            <div className='bg-white w-[344px] h-[467px] rounded-[20px] border-2 border-black flex flex-col justify-between items-center p-5 text-center'>
                <p className='text-2xl border-black border-b-2 w-1/2'>599</p>
                <p className='text-4xl'>12.30</p>
                <p className='text-md'>U R2 B2 F2 U’ R2 B2 U2 F2 U’ L2 U L R’ U B’ L R2 B’ R F</p>
                <p className='text-lg'>27 nov 2024, 10:40hrs</p>


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
                        onClick={() => setshowDetails(false)}    
                    >
                        <Image src={arrowSmall} alt='ok logo' />
                    </button>

                </div>
            </div>
        </div>
        :''
        }
    </>
  )
}

export default TimeCardDetail