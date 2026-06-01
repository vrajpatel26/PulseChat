import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.png"

const ReceiverMessage = ({ image, message }) => {
    let scroll = useRef()
    useEffect(() => {
        scroll?.current.scrollIntoView({ behavior: "smooth" })
    }, [message, image])

    const handleImageScroll = () => {
        scroll?.current.scrollIntoView({ behavior: "smooth" })
    }


    return (
        <div className='w-fit max-w-[75%] px-[20px] py-[10px] bg-slate-300 text-slate-800 text-base sm:text-lg rounded-2xl rounded-tl-none relative left-0 flex flex-col gap-[10px]'>
            <div ref={scroll}>
                {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll} />}

                {message && <span >{message}</span>}
            </div>
        </div>
    )
}

export default ReceiverMessage