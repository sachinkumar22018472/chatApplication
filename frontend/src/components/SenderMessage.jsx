import React from 'react'
import dp from "../assets/dp.webp"



function SenderMessage({image,  message }) {

  return (

    <div className='w-fit max-w-125 px-5 py-2.5 bg-blue-400 text-white rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-2.5 flex flex-col'>
        {image && <img src={image} alt="" className='w-40 rounded-lg'/>}
        {message && <span>{message}</span>}
        
    </div>
  )

}

export default SenderMessage