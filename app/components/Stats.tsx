import Image from 'next/image'
import arrowSmall from '../svg/arrowSmall.svg'


interface SessionEntry {
    [key: string]: (string | number)[];
}


const Stats = ({ setshowStats, sessionData }:{setshowStats: (running: boolean) => void , sessionData: SessionEntry}) => {

    const handleClose = () => setshowStats(false); 

  return (
    <div className='fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black bg-opacity-30 z-10'>
        <div 
            className='bg-white w-1/2 h-[60%] rounded-[20px] border-2 border-black p-5 text-center'
        >
            <div className='flex flex-col justify-between items-center  overflow-scroll'>
                <p className='text-2xl border-black border-b-2 w-1/2'>Stats</p>
                <p className='text-3xl'>597/598</p>
                <p className='text-lg'>30 sept 2024, 17:11hrs - 08 nov 2024, 12:58hrs</p>
                <p className='inline'>Single: 7.16 / 17.93</p>
                <p className='inline'>Average: 10.80</p>
                <p className='inline'>Media: 10.85</p>      

                <table className='border-2 border-black w-full text-left'>
                    <thead className='border-2 border-black'>
                        <tr>
                            <th className='border-2 border-black p-5'>Average</th>
                            <th className='border-2 border-black p-5'>Ao5</th>
                            <th className='border-2 border-black p-5'>Ao12</th>
                            <th className='border-2 border-black p-5'>Ao100</th>   
                        </tr>
                    </thead>
                    <tbody className='border-2 border-black'>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Actual</td>
                            <td className='border-2 border-black p-3'>12.25</td>
                            <td className='border-2 border-black p-3'>11.11</td>
                            <td className='border-2 border-black p-3'>12.25</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Mejor</td>
                            <td className='border-2 border-black p-3'>8.70</td>
                            <td className='border-2 border-black p-3'>9.20</td>
                            <td className='border-2 border-black p-3'>8.70</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black p-3'>Peor</td>
                            <td className='border-2 border-black p-3'>20.08</td>
                            <td className='border-2 border-black p-3'>17.08</td>
                            <td className='border-2 border-black p-3'>20.08</td>
                        </tr>
                    </tbody>
                </table>


                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tiempo</th>
                            <th>Mezcla</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(sessionData).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value[0]}</td>
                        <td>{value[1]}</td>
                        <td>{value[2]}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        <div className='fixed'>
            <button 
                className='flex items-center justify-center bg-speedblue w-12 h-10 border-black border-[1px] rounded-[15px]'
                onClick={handleClose}    >
                <Image src={arrowSmall} alt='ok logo' />
            </button>
        </div>
        </div>
    </div>
  )
}

export default Stats
