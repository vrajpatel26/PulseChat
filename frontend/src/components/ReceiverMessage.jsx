import React from 'react'
import dp from "../assets/dp.png"

const ReceiverMessage = () => {
    return (
        <div className='w-fit max-w-[500px] px-[20px] py-[10px] bg-slate-300 text-slate-800 text-[20px] rounded-2xl rounded-tl-none relative left-0 flex flex-col gap-[10px]'>
            <img src={dp} alt="" className='w-[150px] rounded-lg' />
            <span>Hiii</span>
        </div>
    )
}

export default ReceiverMessage