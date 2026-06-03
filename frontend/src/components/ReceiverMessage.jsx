import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.png"

const ReceiverMessage = ({ messageData }) => {

    const { image, message, createdAt } = messageData;


    const messageTime = new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className='w-fit max-w-[75%] px-[20px] py-[10px] bg-slate-300 text-slate-800 text-base sm:text-lg rounded-2xl rounded-tl-none relative left-0 flex flex-col gap-[10px]'>
            <div>
                {image && <img src={image} alt="" className='w-[150px] rounded-lg' />}

                {message && <span>{message}</span>}

                <p className="text-xs text-slate-600 mt-1">
                    {messageTime}
                </p>
            </div>
        </div>
    )
}

export default ReceiverMessage