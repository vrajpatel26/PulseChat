import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { IoImages } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import dp from "../assets/dp.png"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../main';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

const MessageArea = () => {
    let { selectedUser, userData, socket } = useSelector(state => state.user)
    let { messages } = useSelector(state => state.message)
    let dispatch = useDispatch()
    let [showPicker, setShowPicker] = useState(false)
    let [input, setInput] = useState("")
    let [frontendImage, setFrontendImage] = useState(null)
    let [backendImage, setBackendImage] = useState(null)

    let image = useRef()

    const onEmojiClick = (emojiData) => {
        setInput(prevInput => prevInput + emojiData.emoji)

        setShowPicker(false)
    }


    const handleImage = (e) => {
        let file = e.target.files[0];

        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append("message", input)

            if (backendImage) {
                formData.append("image", backendImage)
            }

            let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })

            // console.log(result.data);
            dispatch(setMessages([...messages, result.data]))

            setInput("")
            setFrontendImage(null)
            setBackendImage(null)


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        socket.on("newMessage", (msg) => {
            dispatch(setMessages([...messages, msg]))
        })
        return () => socket.off("newMessage")
    }, [messages, setMessages])


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

                    <div className=' w-full lg:h-[535px] h-[520px] sm:h-[750px]   flex flex-col py-[25px] px-[20px] overflow-auto gap-[20px] bg-emerald-600'>
                        {showPicker &&
                            <div className='absolute bottom-[100px] left-[20px]'>
                                <EmojiPicker width={260} height={350} onEmojiClick={onEmojiClick} />
                            </div>
                        }
                        {messages && messages?.map((mess) => (
                            <div key={mess._id}>
                                {
                                    mess.sender?.toString() === userData?._id?.toString()
                                        ? <SenderMessage image={mess.image} message={mess.message} />
                                        : <ReceiverMessage image={mess.image} message={mess.message} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }

            {!selectedUser &&
                <div className='h-full w-full flex items-center justify-center'>
                    <h1 className='text-[38px] font-semibold text-[#074d65]'>Welcome to PulseChat </h1>
                </div>}

            {selectedUser &&
                <div className='absolute bottom-[20px] left-0 w-full flex justify-center items-center px-[10px]'>

                    <div>
                        <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[100px] rounded-lg' />
                    </div>

                    <form className='w-full max-w-[900px] h-[60px] bg-slate-300 rounded-full flex items-center gap-[20px] px-[20px]' onSubmit={handleSendMessage}>

                        <div onClick={() => setShowPicker(prev => !prev)}>
                            <GrEmoji className='text-[30px] text-gray-700 cursor-pointer' />
                        </div>

                        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />

                        <input
                            type="text"
                            className='h-full w-full border-0 outline-none text-[20px] bg-transparent'
                            placeholder='Message'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />

                        <div onClick={() => image.current.click()}>
                            <IoImages className='text-[30px] cursor-pointer' />
                        </div>

                        <button>
                            <IoSendSharp className='text-[30px] cursor-pointer' />
                        </button>

                    </form>

                </div>
            }
        </div>
    )
}

export default MessageArea