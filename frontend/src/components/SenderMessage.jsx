import React, { useRef, useState, useEffect } from "react";
import dp from "../assets/dp.webp";

function SenderMessage({ image, message, userImage }) {
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message, image]);

  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={scroll}
      className="flex justify-end items-end gap-2"
    >
      {/* Message Bubble */}
      <div className="w-fit max-w-[250px] px-4 py-2 bg-sky-500 text-white rounded-2xl rounded-br-none shadow-lg flex flex-col gap-2">

        {image && !imageError && (
          <img
            src={image}
            alt="message"
            className="w-40 rounded-lg"
            onError={() => setImageError(true)}
          />
        )}

        {message && <span>{message}</span>}
      </div>

      {/* Profile Image */}
      <img
        src={userImage || dp}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
  );
}

export default SenderMessage;