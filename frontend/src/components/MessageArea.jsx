import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { IoImages } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import dp from "../assets/dp.png"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const MessageArea = () => {
    let { selectedUser } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let [showPicker, setShowPicker] = useState(false)
    let [input , setInput] = useState("")

    const onEmojiClick = (emojiData) =>{
        setInput(prevInput=>prevInput + emojiData.emoji)

        setShowPicker(false)
    }

    return (
        <div className={`lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300 relative `}>

            {selectedUser &&
                <div className='flex flex-col h-[100vh] w-full'>
                    <div className='w-full h-[80px] bg-[#0582ac] rounded-b-[25px] shadow-gray-200 shadow-lg flex items-center gap-[10px]'>
                        <div className='ml-[10px]'>
                            <IoArrowBack className='h-[30px] w-[50px] text-white cursor-pointer' onClick={() => dispatch(setSelectedUser(null))} />
                        </div>
                        <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[50px] w-[50px] mr-3 cursor-pointer ' onClick={() => navigate("/profile")}>
                            <img
                                src={selectedUser?.image || dp}
                                alt="dp"
                                className='w-full h-full object-cover rounded-full'
                            />
                        </div>
                        <h1 className='text-white text-[21px] font-semibold'>{selectedUser?.name || "user"}</h1>

                    </div>

                    <div className='bg-gray-400 w-full h-[535px]'>
                        {showPicker &&
                            <div className='absolute bottom-[100px] left-[20px]'>
                                <EmojiPicker width={260} height={350} onEmojiClick={onEmojiClick}/>
                            </div>
                        }
                    </div>
                </div>
            }

            {!selectedUser &&
                <div className='h-full w-full flex items-center justify-center'>
                    <h1 className='text-[38px] font-semibold text-[#074d65]'>Welcome to PulseChat </h1>
                </div>}

            {selectedUser &&
                <div className='absolute bottom-[20px] left-0 w-full flex justify-center items-center px-[10px]'>

                    <form className='w-full max-w-[900px] h-[60px] bg-slate-300 rounded-full flex items-center gap-[20px] px-[20px]' onSubmit={(e) => e.preventDefault()}>

                        <div onClick={() => setShowPicker(prev => !prev)}>
                            <GrEmoji className='text-[30px] text-gray-700 cursor-pointer' />
                        </div>

                        <input
                            type="text"
                            className='h-full w-full border-0 outline-none text-[20px] bg-transparent'
                            placeholder='Message'
                            onChange={(e)=>setInput(e.target.value)}
                            value={input}
                        />

                        <div>
                            <IoImages className='text-[30px] cursor-pointer' />
                        </div>

                        <div>
                            <IoSendSharp className='text-[30px] cursor-pointer' />
                        </div>

                    </form>

                </div>
            }
        </div>
    )
}

export default MessageArea