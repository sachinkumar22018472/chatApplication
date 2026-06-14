import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoSearch } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { BiLogOutCircle } from "react-icons/bi"
import axios from 'axios'
import { serverUrl } from '../main'
import { setOtherUsers, setSelectedUser, setUserData, setOnlineUsers, setSearchData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function SideBar() {

    const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)

    const [search, setSearch] = useState(false)

    let [input, setInput] = useState("")

    let dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogOut = async () => {

        try {

            await axios.get(
                `${serverUrl}/api/auth/logout`,
                { withCredentials: true }
            )

            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))

            navigate("/login")

        } catch (error) {
            console.log(error)
        }

    }

    const handleSearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
            dispatch(setSearchData(result.data))

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (input.trim()) {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [input]);
    return (

        <div className={`lg:w-[30%] w-full h-screen bg-slate-200 overflow-hidden flex-col ${selectedUser ? "hidden lg:flex" : "flex"}`}>

            {/* Logout Button */}
            <div
                onClick={handleLogOut}
                className='w-12 h-12 rounded-full bg-blue-300 shadow-lg shadow-gray-500 flex justify-center items-center cursor-pointer fixed bottom-5 left-3 z-50'
            >

                <BiLogOutCircle className='w-6 h-6 text-gray-700' />

            </div>

            {/* Top Section */}
            <div className='w-full min-h-75 bg-sky-400 rounded-b-[60px] shadow-lg shadow-gray-400 flex flex-col justify-center gap-8 px-5'>

                {/* App Name */}
                <h1 className='text-white text-5xl font-bold'>
                    Chatly
                </h1>

                {/* User Info */}
                <div className='w-full flex justify-between items-center'>

                    <h1 className='text-2xl font-semibold text-gray-800'>
                        Hii, {userData?.name || "user"}
                    </h1>

                    {/* Current User */}
                    <div
                        className='w-14 h-14 bg-white rounded-full overflow-hidden shadow-lg shadow-gray-500 cursor-pointer'
                        onClick={() => navigate("/profile")}
                    >

                        <img
                            src={userData?.image || dp}
                            alt="profile"
                            className='w-full h-full object-cover'
                        />

                    </div>

                </div>

                {/* Search + Top Users */}
                <div className='w-full flex items-center gap-4 overflow-x-auto no-scrollbar py-2'>

                    {!search && (
                        <div
                            className='w-12 h-12 shrink-0 rounded-full bg-white shadow-lg shadow-gray-500 flex justify-center items-center cursor-pointer'
                            onClick={() => setSearch(true)}
                        >
                            <IoSearch className='text-2xl text-gray-700' />
                        </div>
                    )}

                    {search && (
                        <form className='w-full h-12 bg-white shadow-gray-400 shadow-lg flex items-center gap-3 px-4 rounded-full'>
                            <IoSearch className='text-2xl text-gray-700' />

                            <input
                                type="text"
                                placeholder='Search users...'
                                className='w-full h-full outline-none bg-transparent text-lg'
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />

                            <RxCross2
                                className='w-6 h-6 cursor-pointer'
                                onClick={() => {
                                    setSearch(false);
                                    setInput("");
                                    dispatch(setSearchData([]));
                                }}
                            />
                        </form>
                    )}
                    {!search &&
                        otherUsers
                            ?.filter((user) => onlineUsers?.includes(user._id))
                            .slice(0, 5)
                            .map((user) => (
                                <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg'>

                                    <div
                                        key={user._id}
                                        className='w-14 h-14 shrink-0 rounded-full overflow-hidden bg-white shadow-lg shadow-gray-500 cursor-pointer relative'
                                        onClick={() => dispatch(setSelectedUser(user))}
                                    >
                                        <img
                                            src={user.image || dp}
                                            alt="profile"
                                            className='w-full h-full object-cover'
                                        />

                                    </div>
                                    {/* Online indicator */}
                                    <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></span>

                                </div>
                            ))
                    }
                </div>
            </div>

            {/* User List */}
            <div className='flex-1 overflow-y-auto flex flex-col gap-5 p-3'>

                {(input.trim() ? searchData : otherUsers)?.map((user) => (

                    <div
                        key={user._id}
                        className='flex items-center gap-4 bg-white p-3 rounded-2xl shadow-lg shadow-gray-300 cursor-pointer hover:bg-gray-100 transition'
                        onClick={() => dispatch(setSelectedUser(user))}
                    >

                        <div className='relative w-14 h-14'>
                            <img
                                src={user.image || dp}
                                alt="profile"
                                className='w-full h-full rounded-full object-cover shadow-md'
                            />

                            {onlineUsers?.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></span>
                            )}
                        </div>

                        <h1 className='text-lg font-semibold text-gray-700'>
                            {user.name || user.userName}
                        </h1>

                    </div>
                ))}

            </div>

        </div>

    )
}

export default SideBar