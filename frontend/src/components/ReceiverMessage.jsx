import React, { useEffect, useRef, useState } from 'react'

function ReceiverMessage({ image, message }) {

  let scroll = useRef()
  useEffect(() => {

    scroll?.current.scrollIntoView({ behavior: "smooth" })
  }, [message, image])

  const [imageError, setImageError] = useState(false)

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className='w-fit max-w-125 px-5 py-2.5 bg-blue-200 text-white rounded-tl-none rounded-2xl relative left-0 shadow-gray-400 shadow-lg gap-2.5 flex flex-col' >
      <div ref={scroll}>

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