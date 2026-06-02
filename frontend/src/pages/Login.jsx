import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Login = () => {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")

    let dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let result = await axios.post(
                `${serverUrl}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")

        } catch (error) {
            console.log(error?.response?.data?.message)
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }

    return (
        <div className='w-full min-h-screen bg-slate-200 flex items-center justify-center p-4'>

            <div className='w-[95%] sm:w-full max-w-[500px] min-h-[500px] sm:h-[600px] bg-white rounded-lg shadow-gray-200 shadow-lg flex flex-col gap-[25px] sm:gap-[40px]'>

                <div className='w-full h-[150px] sm:h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-200 shadow-lg flex items-center justify-center'>

                    <h1 className='text-gray-600 font-bold text-[24px] sm:text-[30px] text-center px-2'>
                        Login to <span className='text-white'>PulseChat</span>
                    </h1>

                </div>

                <form
                    className='w-full flex flex-col gap-[20px] items-center'
                    onSubmit={handleLogin}
                >

                    <input
                        type="email"
                        placeholder='email'
                        className='w-[90%] h-[45px] sm:h-[50px] outline-none border-2 border-[#20c7ff] px-[15px] sm:px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[16px] sm:text-[19px]'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <div className='w-[90%] h-[45px] sm:h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>

                        <input
                            type={show ? "text" : "password"}
                            placeholder='password'
                            className='h-full w-full outline-none px-[15px] sm:px-[20px] py-[10px] bg-white text-gray-700 text-[16px] sm:text-[19px]'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <span
                            className='absolute top-[10px] right-[15px] sm:right-[20px] text-[15px] sm:text-[19px] text-[#20c7ff] cursor-pointer'
                            onClick={() => setShow(prev => !prev)}
                        >
                            {show ? "hidden" : "show"}
                        </span>

                    </div>

                    {err && (
                        <p className='text-red-500 text-center px-4'>
                            {err}
                        </p>
                    )}

                    <button
                        className='w-[120px] sm:w-[130px] px-[20px] py-[8px] sm:py-[10px] bg-[#20c7ff] rounded-lg shadow-gray-200 shadow-lg mt-[10px] hover:bg-[#04ace4] font-medium'
                        disabled={loading}
                    >
                        {loading ? "loading..." : "Login"}
                    </button>

                    <p className='text-[14px] sm:text-[16px] text-center px-2'>
                        Don't Have An Account?{" "}
                        <span
                            className='text-[#20c7ff] cursor-pointer'
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </span>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default Login