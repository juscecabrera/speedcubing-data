'use client'

import Image from 'next/image'
import arrow from '../app/svg/arrow.svg'
import { useTimer } from '../app/contexts/TimerContext'
import TimeCardDetail from './TimeCardDetail'

interface Solve {
  solveTime: number;
  scramble: string;
  date: string;
}

interface TimeCardProps {
  id: string;
  data: Solve
}

const TimeCard: React.FC<TimeCardProps> = ({ id, data }) => {
  const { showDetails, setshowDetails } = useTimer()

  const time = data.solveTime as number;
  const scramble = data.scramble as string;
  const date = data.date as string;


  const handleDetailClick = () => {
    setshowDetails(showDetails === id ? null : id);
  };

  return (
    <div className='bg-white rounded-[20px] w-40 h-56 border-2 border-black flex flex-col justify-between items-center p-4'>
        
        <div className='flex flex-col items-center w-full'>
            <p className='text-black text-2xl'>{id}</p>
            <div className='bg-black h-[1px] w-full'></div>
        </div>

        <p className='text-black text-2xl'>{time}</p>

        <button onClick={handleDetailClick} className='bg-speedblue border-2 border-black rounded-[20px] w-full h-10 flex justify-center items-center'>
          <Image src={arrow} alt='arrow'width={40}/>
        </button>

      {showDetails === id && (
        <TimeCardDetail id={id} time={time} scramble={scramble} date={date} />
      )}
    </div>
  )
}

export default TimeCard