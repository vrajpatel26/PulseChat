import React, { useRef, useState } from 'react'
import dp from "../assets/dp.png"
import { IoCameraOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';


const Profile = () => {
    let { userData } = useSelector(state => state.user)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [name, setName] = useState(userData.name || "")
    const [frontendImage, setFrontendImage] = useState(userData.image || dp)
    const [backendImage, setBackendImage] = useState(null)
    const [saving, setSaving] = useState(false)

    let image = useRef()

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e) => {

        e.preventDefault()
        setSaving(true)


        try {
            let formData = new FormData();
            formData.append("name", name);

            if (backendImage) {
                formData.append("image", backendImage)
            }

            let result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })

            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error);

            setSaving(false)


        }
    }

    return (
        <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[40px]'>

            <div className='fixed left-[30px] top-[30px] '>
                <IoArrowBack className='h-[30px] w-[50px] text-gray-700 cursor-pointer' onClick={() => navigate("/")} />

            </div>

            <div
                className='relative w-[200px] h-[200px]'
                onClick={() => image.current.click()}
            >

                <div className='bg-white rounded-full border-2 border-[#20c7ff] w-full h-full overflow-hidden cursor-pointer'>
                    <img
                        src={frontendImage}
                        alt="dp"
                        className='w-full h-full object-cover'
                    />
                </div>

                <IoCameraOutline className='absolute bottom-4 right-2 text-gray-700 w-[30px] h-[30px] bg-white border-2 border-[#20c7ff] rounded-full p-1 cursor-pointer' />

            </div>

            <div>
                <form className='w-[95%] max-w-[500px] gap-[20px] flex items-center justify-center flex-col' onSubmit={handleProfile}>

                    <input type='file' accept='image/*' ref={image} hidden onChange={handleImage} />

                    <input type="text" placeholder='Enter your name' className='w-[140%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg  text-gray-700 text-[19px] ' onChange={(e) => setName(e.target.value)} value={name} />

                    <input type="text" readOnly className='w-[140%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg  text-gray-400 text-[19px] ' value={userData?.userName} />

                    <input type="email" readOnly className='w-[140%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg  text-gray-400 text-[19px] ' value={userData?.email} />

                    <button className='w-[130px] border-2 border-none px-[20px] py-[10px] bg-[#20c7ff] rounded-lg  shadow-gray-200 shadow-lg  mt-[10px] hover:bg-[#04ace4] font-medium' disabled={saving} >{saving ? "saving..." : "Save profile"}</button>

                </form>

            </div>

        </div>
    )
}

export default Profile