import React, { useState } from 'react'

function SenderMessage({ image, message }) {

  const [imageError, setImageError] = useState(false)

  return (
    <div className='w-fit max-w-125 px-5 py-2.5 bg-blue-400 text-white rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-2.5 flex flex-col'>

      {image && !imageError && (
        <img
          src={image}
          alt="message"
          className='w-40 rounded-lg'
          onError={() => {
            console.log("Sender Image Failed:", image)
            setImageError(true)
          }}
        />
      )}

      {message && <span>{message}</span>}

    </div>
  )
}

export default SenderMessage