import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {

  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading]= useState(false)
  const [err, setErr]= useState("")
  const dispatch = useDispatch("")
 



  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      dispatch(setUserData(result.data))
      setEmail("")
      setPassword("")
      setLoading(false)
      setErr("")

     

      navigate("/profile")

    } catch (error) {

      console.log(error)

      
      setLoading(false)
      setErr(error?.response?.data?.message)
    }
  }

  return (
    <div className='w-full min-h-screen bg-slate-200 flex items-center justify-center'>

      <div className='w-full max-w-115 h-auto py-8 bg-white rounded-lg shadow-lg shadow-gray-400 flex flex-col gap-2'>

        <div className='w-full h-50 bg-[#69c5ed] rounded-t-lg rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-3xl'>
            Welcome to <span className='text-white'>Chatly</span>
          </h1>
        </div>

        <form
          className='w-full flex flex-col gap-5 items-center mt-8'
          onSubmit={handleSignUp}
        >

          <input
            type="text"
            placeholder='Username'
            className='w-[90%] h-12 outline-none border-2 border-blue-300 px-4 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />

          <input
            type="email"
            placeholder='Email'
            className='w-[90%] h-12 outline-none border-2 border-blue-300 px-4 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <div className='w-[90%] h-12 border-2 border-blue-300 rounded-lg overflow-hidden shadow-gray-200 shadow-lg relative'>

            <input
              type={show ? "text" : "password"}
              placeholder='Password'
              className='w-full h-full outline-none px-4 bg-white text-gray-700'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <span
              className='absolute top-3 right-5 text-sm text-blue-400 font-medium cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>

          </div>
          {err && <p className='text-red-600'>
            {err}
          </p> }
          <button
            type='submit'
            className='px-15 py-2.5 bg-blue-300 rounded-2xl shadow-gray-400 shadow-lg text-lg mt-5 font-bold hover:shadow-inner'
            disabled={loading}
          >
            {loading? "loading...":"Sign Up"}
          </button>

          <p
            className='cursor-pointer mb-4'
            onClick={() => navigate("/login")}
          >
            Already Have An Account ?
            <span className='text-blue-400 font-bold'> Login</span>
          </p>

        </form>

      </div>

    </div>
  )
}

export default SignUp