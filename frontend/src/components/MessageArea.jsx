import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import dp from "../assets/dp.webp"
import { getProfileImage, handleImageError } from "../utils/imageHelper"
import { RiEmojiStickerLine } from "react-icons/ri"
import { FaImages } from "react-icons/fa6"
import { IoSendSharp } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'
import { addMessage } from "../redux/messageSlice";

import { setSelectedUser } from '../redux/userSlice'

import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import axios from 'axios'
import { serverUrl } from '../main'
import { useRef } from 'react'


function MessageArea() {

  const { selectedUser, userData, socket } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [showPicker, setShowPicker] = useState(false)

  const [message, setMessage] = useState("")
  const [frontendImage, setFrontedImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)

  let image = useRef()
  let messagesEndRef = useRef(null)

  let { messages } = useSelector(state => state.message)

  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontedImage(URL.createObjectURL(file))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !backendImage) {
      return;
    }

    const currentMsg = message;
    const currentBackendImage = backendImage;

    // Immediately reset input for snappy, responsive feel
    setMessage("");
    setFrontedImage(null);
    setBackendImage(null);
    if (image.current) {
      image.current.value = "";
    }

    try {
      let formData = new FormData();
      formData.append("message", currentMsg);

      if (currentBackendImage) {
        formData.append("image", currentBackendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      // Sender side par message dikhao
      dispatch(addMessage(result.data));

    } catch (error) {
      console.log(error);
      setMessage(currentMsg);
      alert(error?.response?.data?.message || "Failed to send message");
    }
  };

  // Emoji Select Function
  const onEmojiClick = (emojiData) => {

    setMessage((prev) => prev + emojiData.emoji)

  }

  useEffect(() => {

    if (!socket) return;

    const handleNewMessage = (mess) => {
      if (selectedUser && (mess.sender === selectedUser._id || mess.receiver === selectedUser._id)) {
        dispatch(addMessage(mess));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };

  }, [socket, dispatch, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  return (

    <div
      className={`${selectedUser ? "flex" : "hidden lg:flex"} w-full flex-col h-screen bg-slate-200 relative`}
    >

      {selectedUser ? (

        <>

          {/* Top Bar */}
          <div
            className='w-full min-h-25 bg-sky-600 rounded-b-3xl shadow-lg shadow-gray-400 flex items-center px-8 gap-4'
          >

            {/* Back Button */}
            <div
              className='cursor-pointer'
              onClick={() => dispatch(setSelectedUser(null))}
            >

              <IoMdArrowRoundBack className='w-8 h-8 text-white' />

            </div>

            {/* User Image */}
            <div className='w-12 h-12 rounded-full overflow-hidden shadow-md'>

              <img
                src={getProfileImage(selectedUser?.image)}
                alt="profile"
                className='w-full h-full object-cover'
                onError={handleImageError}
              />

            </div>

            {/* User Name */}
            <h1 className='text-white font-semibold text-2xl'>

              {selectedUser?.name || "User"}

            </h1>

          </div>

          <div className='flex-1 overflow-y-auto p-5 flex flex-col gap-4 pb-24'>

            {messages && messages.map((mess) => (
              String(mess.sender) === String(userData?._id)
                ? (
                  <SenderMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                    userImage={userData?.image}
                  />
                )
                : (
                  <ReceiverMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                    userImage={selectedUser?.image}
                  />
                )
            ))}
            <div ref={messagesEndRef}></div>


          </div>



          {/* Bottom Input Section */}
          <div
            className='fixed bottom-4 lg:left-[32%] left-1/2 lg:translate-x-0 -translate-x-1/2 lg:w-[65%] w-[90%]'
          >

            {/* Emoji Picker */}
            {showPicker && (

              <div className='absolute bottom-16 left-0 z-80'>

                <EmojiPicker
                  width={300}
                  height={350}
                  onEmojiClick={onEmojiClick}
                />

              </div>

            )}




            {/* Image Preview with Remove Button */}
            {frontendImage && (
              <div className='absolute bottom-20 right-[10%] z-20'>
                <img
                  src={frontendImage}
                  alt="preview"
                  className='w-20 h-20 object-cover rounded-lg shadow-gray-400 shadow-lg border-2 border-white'
                />
                <button
                  type="button"
                  onClick={() => {
                    setFrontedImage(null);
                    setBackendImage(null);
                    if (image.current) image.current.value = "";
                  }}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer'
                >
                  <RxCross2 className='w-3 h-3' />
                </button>
              </div>
            )}
            <form
              action=""
              className='w-full bg-sky-600 shadow-lg shadow-gray-400 flex items-center px-3 gap-2 h-14 rounded-full'
              onSubmit={handleSendMessage}
            >

              {/* Emoji Button */}
              <div
                className='cursor-pointer'
                onClick={() => setShowPicker((prev) => !prev)}
              >

                <RiEmojiStickerLine className='w-5 h-5 text-white' />

              </div>
              <input type="file" hidden accept='image/*' ref={image} onChange={handleImage} />
              {/* Input */}
              <div className='flex-1 h-10 bg-white rounded-full px-4 flex items-center'>

                <input
                  type="text"
                  placeholder='Type a message'
                  value={message}
                  onChange={(e) => {

                    setMessage(e.target.value)

                    // Hide Emoji Picker While Typing
                    if (showPicker) {

                      setShowPicker(false)

                    }

                  }}
                  className='w-full bg-transparent outline-none text-lg text-gray-700 placeholder:text-gray-400'
                />

              </div>

              {/* Image Button */}
              <div className='cursor-pointer' onClick={() => image.current.click()}>

                <FaImages className='w-5 h-5 text-white' />

              </div>

              {/* Send Button */}
              {(message.length > 0 || backendImage) && (
                <button type="submit">
                  <IoSendSharp className='w-5 h-5 text-white cursor-pointer' />
                </button>
              )}


            </form>

          </div>

        </>

      ) : (

        // No User Selected
        <div className='w-full h-screen flex justify-center items-center'>

          <h1 className='text-5xl font-bold text-gray-700 flex flex-col items-center gap-3'>

            Welcome to Chatly

            <span className='text-2xl text-sky-600 font-semibold'>

              Chat Friendly....

            </span>

          </h1>

        </div>

      )}

    </div>

  )

}

export default MessageArea



