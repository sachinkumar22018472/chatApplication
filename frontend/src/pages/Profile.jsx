import React from 'react'
import dp from "../assets/dp.webp"
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
    let {userData} = useSelector(state=>state.user)
    let navigate = useNavigate()

    let dispatch = useDispatch()

    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFrontendImage] = useState(userData.image || dp)
    let [backendImage, setBackendImage] = useState(null)


    let image = useRef()

    let [saving, setSaving] = useState(false)

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }


    const handleProfile = async (e)=> {
        e.preventDefault()
        setSaving(true)

        try {
            let formData = new FormData()
            formData.append("name", name)
            if(backendImage) {
                formData.append("image", backendImage)
            }


            let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {withCredentials: true})
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/home")
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }
    
  return (
    <div className='w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center gap-8'>

        <div className='fixed top-5 left-5 cursor-pointer' onClick={() => navigate("/")}> 
            <IoMdArrowRoundBack className='w-13 h-13 text-gray-600'/>
        </div>

      {/* Profile Image */}
      <div className='relative bg-white rounded-full border-4 border-blue-400 shadow-gray-400 shadow-lg' onClick={()=>image.current.click()}>

        <div className='w-50 h-50 overflow-hidden rounded-full flex justify-center items-center'>
          <img
            src={frontendImage}
            alt="profile"
            className='h-full w-full object-cover'
          />
        </div>

        <MdOutlineCameraAlt className='absolute bottom-2 right-2 text-3xl bg-white rounded-full p-1 shadow-md cursor-pointer' />

      </div>

      {/* Form */}
      <form className='w-full max-w-md bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-5 ' onSubmit={handleProfile}>

        <input type="file" hidden accept='image/*' ref={image} onChange={handleImage} />

        <input
          type="text"
          placeholder='Enter your name'
          className='w-full h-12 outline-none border-2 border-blue-300 px-4 rounded-lg text-gray-700' 
          onChange={(e) => setName(e.target.value)} value={name}
        />

        <input
          type="text"
          readOnly
          value={userData?.userName}
          className='w-full h-12 outline-none border-2 border-blue-300 px-4 rounded-lg text-gray-400 bg-gray-100'
        />

        <input
          type="email"
          readOnly
          value={userData?.email}
          className='w-full h-12 outline-none border-2 border-blue-300 px-4 rounded-lg text-gray-400 bg-gray-100'
        />

        {/* Button Center */}
        <button
          type='submit'
          className='w-40 h-12 mx-auto bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-lg text-white font-semibold cursor-pointer' disabled={saving}
        >
          {saving?"saving...": "Save Profile"}
        </button>

      </form>

    </div>
  )
}

export default Profile