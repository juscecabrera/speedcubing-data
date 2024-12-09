'use client'

import React from 'react'
import clipboard from '../app/svg/clipboard.svg'
import trash from '../app/svg/trashCan.svg'
import close from '../app/svg/close.svg'
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
                <div className='grid grid-cols-3 w-full'>
                    <p className='text-2xl border-black border-b-2 col-start-2 col-end-2'>{id}</p>
                    <div className="col-start-3 flex justify-end items-center">
                        <button onClick={handleClose} >
                        <Image
                        src={close}
                        alt="close"
                        width={20}
                        height={20}
                        />
                        </button>
                    </div>
                </div>
                <p className='text-4xl'>{time}</p>
                <p className='text-md'>{scramble}</p>
                <p className='text-lg'>{date}</p>


                <div className='flex flex-row gap-4'>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button onClick={() => {}}>
                            <Image src={clipboard} alt='clipboard logo'/>
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button onClick={() => {}}>
                            DNF
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button onClick={() => {}}>
                            OK
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button onClick={() => {}}>
                            +2
                        </button>
                    </div>
                    <div className='border-[2px] rounded-lg border-black border-opacity-10 w-10 h-10 flex justify-center items-center'>
                        <button onClick={() => {}}>
                            <Image src={trash} alt='trashcan' width={30} height={30}/>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default TimeCardDetail