import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.png"
import { IoIosSearch } from "react-icons/io";

const Sidebar = () => {
    let { userData } = useSelector(state => state.user)
    return (
        <div className='lg:w-[30%] w-full h-full bg-slate-200'>

            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-200 shadow-lg flex justify-center flex-col '>

                <h1 className='text-white text-[27px] font-bold  px-[30px]'>PulseChat</h1>

                <div className='flex justify-between items-center'>
                    <h1 className='text-gray-600 text-xl font-bold  px-[30px]'>Hii , {userData.name}</h1>

                    <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[60px] w-[60px] mr-3 '>
                        <img
                            src={userData.image || dp}
                            alt="dp"
                            className='w-full h-full object-cover rounded-full'
                        />
                    </div>

                </div>

                <div className='bg-white rounded-full border-2 border-[#20c7ff] h-[50px] w-[50px] flex items-center justify-center  '>
                    <IoIosSearch className='h-[30px] w-[30px]' />
                </div>

            </div>

        </div>
    )
}

export default Sidebar