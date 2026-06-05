import React from 'react'
import dp from "../assets/dp.webp"
function ReceiverMessage({ image, message }) {
    return (
        <div className='w-fit max-w-125 px-5 py-2.5 bg-blue-200 text-white rounded-tl-none rounded-2xl relative left-0  shadow-gray-400 shadow-lg gap-2.5 flex flex-col'>
            {image && <img src={image} alt="" className='w-40 rounded-lg' />}
            {message && <span>{message}</span>}
        </div>
    )
}

export default ReceiverMessage