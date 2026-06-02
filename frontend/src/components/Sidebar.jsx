import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.png"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';
import { serverUrl } from '../main';
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';


const Sidebar = () => {
    let { userData, otherUsers, selectedUser, onlineUsers } = useSelector(state => state.user)
    let [search, setSearch] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let handleLogOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })

            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className={`lg:w-[30%] lg:block ${!selectedUser ? "block" : "hidden "} w-full h-full bg-slate-200`}>

            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-200 shadow-lg flex justify-center flex-col '>

                <h1 className='text-white text-[27px] font-bold  px-[30px]'>PulseChat</h1>

                <div className='flex justify-between items-center'>
                    <h1 className='text-gray-600 text-xl font-bold  px-[30px]'>Hii , {userData.name || "User"}</h1>

                    <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[60px] w-[60px] mr-3 cursor-pointer ' onClick={() => navigate("/profile")}>
                        <img
                            src={userData.image || dp}
                            alt="dp"
                            className='w-full h-full object-cover rounded-full'
                        />
                    </div>


                </div>
                <div className='flex items-center gap-[20px] overflow-y-auto'>

                    {!search &&
                        <div className='bg-white rounded-full mt-[10px] border-2 border-[#20c7ff] h-[50px] w-[50px] flex items-center justify-center ml-[25px] ' onClick={() => setSearch(true)}>
                            <IoIosSearch className='h-[25px] w-[25px] cursor-pointer' />
                        </div>}

                    {search &&
                        <form className='w-[90%] h-[50px] ml-[30px] mt-[10px] bg-white flex items-center gap-[10px] rounded-full overflow-hidden px-[20px]'>
                            <IoIosSearch className='h-[25px] w-[25px] cursor-pointer' />
                            <input type="text" placeholder='search users...' className='h-full w-full p-[10px] outline-0 border-0 ' />
                            <RxCross2 className='h-[25px] w-[25px] cursor-pointer' onClick={() => setSearch(false)} />

                        </form>
                    }
                    {!search && otherUsers?.map((user) => (
                        onlineUsers?.includes(user._id) &&
                        <div className='relative flex justify-center items-center rounded-full'>
                            <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[50px] w-[50px] mr-3 mt-[10px]'>
                                <img
                                    src={user.image || dp}
                                    alt="dp"
                                    className='w-full h-full object-cover rounded-full'
                                />
                            </div>
                            <span className='w-[12px] h-[12px] rounded-full absolute bg-green-400 right-3 bottom-0.5'></span>
                        </div>

                    ))}


                </div>
            </div>

            <div className='w-full h-[44%] flex flex-col items-center gap-[20px] overflow-auto mt-[15px]'>
                {otherUsers?.map((user) => (
                    <div className='w-[90%] h-[60px] rounded-full flex justify-start items-center bg-white gap-[10px] hover:bg-gray-300 cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}>

                        <div className='relative flex justify-center items-center rounded-full'>
                            <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[50px] w-[50px] mr-3 m-[10px]'>
                                <img
                                    src={user.image || dp}
                                    alt="dp"
                                    className='w-full h-full object-cover rounded-full'
                                />
                            </div>
                            {onlineUsers?.includes(user._id) &&
                                <span className='w-[12px] h-[12px] rounded-full absolute bg-green-400 right-3 bottom-3'>
                                </span>
                            }
                        </div>
                        <h1 className='text-gray-600 text-[15px] font-semibold'>{user.name || user.userName}</h1>
                    </div>

                ))}
            </div>

            <div className='bg-white text-gray-600 rounded-full mt-[10px] border-2 border-[#20c7ff] h-[50px] w-[50px] flex items-center justify-center ml-[25px] fixed bottom-[25px]  cursor-pointer' onClick={handleLogOut}>
                <TbLogout2 className='h-[25px] w-[25px]' />
            </div>

        </div>
    )
}

export default Sidebar