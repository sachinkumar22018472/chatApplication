import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import useGetMessages from '../customHooks/getMessages'

function Home() {

  const { selectedUser } = useSelector(state => state.user)

  useGetMessages()

  return (

    <div className='w-full h-screen flex overflow-hidden'>

      <SideBar />

      <div
        className={`${selectedUser ? "flex" : "hidden lg:flex"} w-full lg:w-[70%]`}
      >

        <MessageArea />

      </div>

    </div>

  )

}

export default Home