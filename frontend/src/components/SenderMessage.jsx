import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.png"

const SenderMessage = ({ image, message }) => {
  let scroll = useRef()
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" })
  }, [message, image])
  return (
    <div className='w-fit max-w-[75%] px-[20px] py-[10px] bg-[#9dc3cf] text-slate-800 text-[20px] rounded-2xl rounded-tr-none relative ml-auto right-0 flex flex-col gap-[10px]'  ref={scroll}>

      {image && <img src={image} alt="" className='w-[150px] rounded-lg' />}

      {message && <span>{message}</span>}

    </div>
  )
}

export default SenderMessage