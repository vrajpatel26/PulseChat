import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const SignUp = () => {

    let navigate = useNavigate()
    let [show, setShow] = useState(false)

    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")

    let dispatch = useDispatch()
   

    const handleSignUp = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                userName, email, password
            }, { withCredentials: true })

            // console.log(result);
            dispatch(setUserData(result.data))
            navigate("/profile")
            setUserName("");
            setEmail("");
            setPassword("");

            setLoading(false)
            setErr("")


        } catch (error) {
            console.log(error?.response?.data?.message);
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }


    return (
        <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>

            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-200 shadow-lg flex flex-col gap-[40px]'>

                <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-200 shadow-lg flex items-center justify-center '>

                    <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to <span className='text-white'>PulseChat</span></h1>

                </div>

                <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}>
                    <input type="text" placeholder='username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg  text-gray-700 text-[19px] ' onChange={(e) => setUserName(e.target.value)} value={userName} />

                    <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg  text-gray-700 text-[19px] ' onChange={(e) => setEmail(e.target.value)} value={email} />


                    <div className='w-[90%] h-[50px]  border-2 border-[#20c7ff] overflow-hidden  rounded-lg shadow-gray-200 shadow-lg relative'>
                        <input type={`${show ? "text" : "password"}`} placeholder='password' className='h-full w-full  outline-none px-[20px] py-[10px] bg-white  text-gray-700 text-[19px] '
                            onChange={(e) => setPassword(e.target.value)} value={password} />

                        <span className='absolute top-[10px] right-[20px] text-[19px]  text-[#20c7ff] cursor-pointer' onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show"}`}</span>
                    </div>

                    {err && <p className='text-red-500'>{err}</p>}


                    <button className='w-[130px] border-2 border-none px-[20px] py-[10px] bg-[#20c7ff] rounded-lg  shadow-gray-200 shadow-lg  mt-[10px] hover:bg-[#04ace4] font-medium' disabled={loading}>{loading ? "loading..." : "Sign Up"}</button>

                    <p>Already Have An Account? <span className='text-[#20c7ff] cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>

                </form>

            </div>

        </div>
    )
}

export default SignUp