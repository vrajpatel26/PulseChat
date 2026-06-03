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
    let { selectedUser, userData, socket, onlineUsers } = useSelector(state => state.user)
    let { messages } = useSelector(state => state.message)
    let dispatch = useDispatch()
    let [showPicker, setShowPicker] = useState(false)
    let [input, setInput] = useState("")
    let [frontendImage, setFrontendImage] = useState(null)
    let [backendImage, setBackendImage] = useState(null)
    const [isTyping, setIsTyping] = useState(false)

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

        if (input == 0 && backendImage == null) {
            return
        }



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


    useEffect(() => {

        if (!socket) return;

        socket.on("userTyping", () => {
            setIsTyping(true);
        });

        socket.on("userStopTyping", () => {
            setIsTyping(false);
        });

        return () => {
            socket.off("userTyping");
            socket.off("userStopTyping");
        };

    }, [socket]);


    const formatLastSeen = (lastSeen) => {

        if (!lastSeen) return "recently";

        const date = new Date(lastSeen);

        return date.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short"
        });
    };

    return (
        <div className={`lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300 relative `}>

            {selectedUser &&
                <div className='flex flex-col h-dvh w-full'>
                    <div className='w-full h-[80px] bg-[#0582ac] rounded-b-[25px] shadow-gray-200 shadow-lg flex items-center gap-[10px]'>

                        <div className='ml-[10px]'>
                            <IoArrowBack className='h-[30px] w-[50px] text-white cursor-pointer' onClick={() => dispatch(setSelectedUser(null))} />
                        </div>

                        <div className='relative'>

                            <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[50px] w-[50px] mr-3 cursor-pointer ' onClick={() => navigate("/profile")}>


                                <img
                                    src={selectedUser?.image || dp}
                                    alt="dp"
                                    className='w-full h-full object-cover rounded-full'
                                />
                                {onlineUsers?.includes(selectedUser._id) &&
                                    <span className='w-[12px] h-[12px] rounded-full absolute bg-green-400 left-9 bottom-0.5'>
                                    </span>
                                }

                            </div>
                        </div>

                        <div className='mb-1'>
                            <h1 className='text-white text-[21px] font-semibold'>
                                {selectedUser?.name || "user"}
                            </h1>

                            {isTyping ? (

                                <p className='text-white text-sm'>
                                    typing...
                                </p>

                            ) : onlineUsers?.includes(selectedUser?._id) ? (

                                <p className='text-white text-sm'>
                                    online
                                </p>

                            ) : (

                                <p className='text-white text-sm'>
                                    Last seen {formatLastSeen(selectedUser?.lastSeen)}
                                </p>

                            )}
                        </div>

                    </div>

                    <div className='flex-1 w-full py-6 px-5 overflow-y-auto flex flex-col gap-5 lg: mb-[80px] bg-slate-200'>

                        {showPicker &&
                            <div className='absolute bottom-[100px] left-[20px] z-[100]'>
                                <EmojiPicker width={260} height={350} onEmojiClick={onEmojiClick} />
                            </div>
                        }
                        {messages && messages?.map((mess) => (
                            <div key={mess._id}>
                                {
                                    mess.sender?.toString() === userData?._id?.toString()
                                        ? <SenderMessage messageData={mess} />
                                        : <ReceiverMessage messageData={mess} />
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
                <div className='absolute bottom-[20px]  w-full flex justify-center items-center px-[10px]'>

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
                            value={input}
                            onChange={(e) => {

                                setInput(e.target.value);

                                socket.emit("typing", {
                                    receiverId: selectedUser._id,
                                    senderName: userData.name
                                });

                                clearTimeout(window.typingTimer);

                                window.typingTimer = setTimeout(() => {

                                    socket.emit("stopTyping", {
                                        receiverId: selectedUser._id
                                    });

                                }, 2000);

                            }}
                        />

                        <div onClick={() => image.current.click()}>
                            <IoImages className='text-[30px] cursor-pointer' />
                        </div>


                        {(input.length > 0 || backendImage != null) &&
                            (<button>
                                <IoSendSharp className='text-[30px] cursor-pointer' />
                            </button>)
                        }



                    </form>

                </div>
            }
        </div>
    )
}

export default MessageArea