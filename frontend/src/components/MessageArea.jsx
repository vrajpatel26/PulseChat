import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import dp from "../assets/dp.png"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const MessageArea = () => {
    let { selectedUser } = useSelector(state => state.user)
    let dispatch = useDispatch()
    return (
        <div className={`lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300 relative `}>

            {selectedUser &&
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
            }

            {!selectedUser &&
                <div className='h-full w-full flex items-center justify-center'>
                    <h1 className='text-[38px] font-semibold text-[#074d65]'>Welcome to PulseChat </h1>
                </div>}
            <div className='flex justify-center items-center'>
                <div className='w-full lg:w-[50%] h-[100px] fixed bottom-[20px] flex justify-center items-center bg-red-200'>
                    <form className=' w-[95%] max-w-[60%] h-[60px] bg-yellow-200 rounded-full'></form>
                </div>
            </div>
        </div>
    )
}

export default MessageArea