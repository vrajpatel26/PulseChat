import React from 'react'
import dp from "../assets/dp.png"

const ReceiverMessage = ({image , message}) => {
    return (
        <div className='w-fit max-w-[500px] px-[20px] py-[10px] bg-slate-300 text-slate-800 text-[20px] rounded-2xl rounded-tl-none relative left-0 flex flex-col gap-[10px]'>

            {image && <img src={image} alt="" className='w-[150px] rounded-lg' />}

            {message && <span>{message}</span>}

        </div>
    )
}

export default ReceiverMessage