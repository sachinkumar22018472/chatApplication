import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.webp"

function ReceiverMessage({ image, message, userImage }) {

  const scroll = useRef()

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [message, image])

  const [imageError, setImageError] = useState(false)

  const handleImageScroll = () => {
    scroll.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (

    <div
      ref={scroll}
      className='flex items-end gap-2 w-fit'
    >

      {/* Receiver Profile Image */}
      <img
        src={userImage || dp}
        alt="profile"
        className='w-10 h-10 rounded-full object-cover flex-shrink-0'
      />

      {/* Message Bubble */}
      <div className='max-w-[300px] px-5 py-2.5 bg-blue-200 text-black rounded-tl-none rounded-2xl shadow-gray-400 shadow-lg flex flex-col gap-2'>

        {image && !imageError && (
          <img
            src={image}
            alt="message"
            className='w-40 rounded-lg'
            onLoad={handleImageScroll}
            onError={() => {
              console.log("Receiver Image Failed:", image)
              setImageError(true)
            }}
          />
        )}

        {message && <span>{message}</span>}

      </div>

    </div>

  )
}

export default ReceiverMessage