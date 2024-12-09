import Image from 'next/image'
import arrowSmall from '../app/svg/arrowSmall.svg'
import { formatMongoDBDate } from '@/utils/generateScramble';
import { averageOfN, bestWorstAverageOfN } from '@/utils/generateStats';

interface Solve {
    solveTime: number;
    scramble: string;
    date: string;
  }
  
interface SessionData {
    _id: string;
    name: string;
    solves: Solve[];
    createdAt: string;
    updatedAt: string;
}

const Stats = ({ setshowStats, sessionData }:{setshowStats: (running: boolean) => void , sessionData: SessionData}) => {

  const handleClose = () => setshowStats(false); 

  const totalSolves = sessionData?.solves.length
  const initialDate = formatMongoDBDate(sessionData.createdAt)
  const finalDate = formatMongoDBDate(sessionData.updatedAt)

  const bestSingle = Math.min(...sessionData.solves.map(solve => solve.solveTime));
  const worstSingle = Math.max(...sessionData.solves.map(solve => solve.solveTime));

  const mean = sessionData.solves.reduce((sum, solve) => sum + solve.solveTime, 0) / sessionData.solves.length;
  
  const ao5 = averageOfN(sessionData, 5)
  const ao12 = averageOfN(sessionData, 12)
  const ao100 = averageOfN(sessionData, 100)
  const averageSession = averageOfN(sessionData, totalSolves)

  const bestAo5 = bestWorstAverageOfN(sessionData, 5)[0]
  const worstAo5 = bestWorstAverageOfN(sessionData, 5)[1]
  
  const bestAo12 = bestWorstAverageOfN(sessionData, 12)[0]
  const worstAo12 = bestWorstAverageOfN(sessionData, 12)[1]

  const bestAo100 = bestWorstAverageOfN(sessionData, 100)[0]
  const worstAo100 = bestWorstAverageOfN(sessionData, 100)[1]


  
  const sesssionName = sessionData.name
  


  return (
    <div className='fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black bg-opacity-30 z-10'>
        <div 
            className='bg-white w-1/2 h-[60%] rounded-[20px] border-2 border-black p-5 text-center overflow-scroll'
        >
            <div className='flex flex-col justify-between items-center gap-5'>
                <p className='text-2xl border-black border-b-2 w-1/2'>Stats</p>
                <p className='text-2xl w-1/2'>{sesssionName}</p>
                <p className='text-3xl'>{totalSolves}</p>
                <p className='text-lg'>{initialDate} - {finalDate}</p>
                <p className='inline'>Single: {bestSingle} / {worstSingle}</p>
                <p className='inline'>Average: {averageSession}</p>
                <p className='inline'>Media: {mean}</p>      

                <table className='border-2 border-black w-auto text-left'>
                    <thead className='border-2 border-black'>
                        <tr>
                            <th className='border-2 border-black p-3'>Average</th>
                            <th className='border-2 border-black p-3'>Ao5</th>
                            <th className='border-2 border-black p-3'>Ao12</th>
                            <th className='border-2 border-black p-3'>Ao100</th>   
                        </tr>
                    </thead>
                    <tbody className='border-2 border-black'>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Actual</td>
                            <td className='border-2 border-black p-3'>{ao5}</td>
                            <td className='border-2 border-black p-3'>{ao12}</td>
                            <td className='border-2 border-black p-3'>{ao100}</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Mejor</td>
                            <td className='border-2 border-black p-3'>{bestAo5}</td>
                            <td className='border-2 border-black p-3'>{bestAo12}</td>
                            <td className='border-2 border-black p-3'>{bestAo100}</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Peor</td>
                            <td className='border-2 border-black p-3'>{worstAo5}</td>
                            <td className='border-2 border-black p-3'>{worstAo12}</td>
                            <td className='border-2 border-black p-3'>{worstAo100}</td>
                        </tr>
                    </tbody>
                </table>


                <table className='border-2 border-black p-2'>
                    <thead className='border-2 border-black p-2'>
                        <tr className='border-2 border-black p-2'>
                            <th className='border-2 border-black p-2'></th>
                            <th className='border-2 border-black p-2'>Tiempo</th>
                            <th className='border-2 border-black p-2'>Mezcla</th>
                            <th className='border-2 border-black p-2'>Fecha</th>
                        </tr>
                    </thead>
                    <tbody className='border-2 border-black p-2'>
                    {Object.entries(sessionData.solves).map(([key, value]) => (
                    <tr className='border-2 border-black p-2' key={key}>
                        <td className='border-2 border-black p-2'>{Number(key) + 1}</td>
                        <td className='border-2 border-black p-2'>{value.solveTime}</td>
                        <td className='border-2 border-black p-2'>{value.scramble}</td>
                        <td className='border-2 border-black p-2'>{value.date}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button 
                className='flex items-center justify-center bg-speedblue w-12 h-10 border-black border-[1px] rounded-[15px]'
                onClick={handleClose}    >
                <Image src={arrowSmall} alt='ok logo'/>
            </button>
        </div>
    </div>
  )
}

export default Stats
