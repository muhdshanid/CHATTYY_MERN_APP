import React from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { FaSmile } from 'react-icons/fa'
import {ImAttachment} from 'react-icons/im'
import {IoPaperPlaneSharp} from 'react-icons/io5'
const MessageInput = () => {
  return (
    <div className='w-full rounded-tr-lg  rounded-tl-lg bg-white shadow-lg  shadow-black'>
        <div className='flex  items-center py-2 px-4 gap-2'>
        <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <FaSmile size={27} className="color"/>
            </div>
            <div className='grow '>
                <input type="text" className='w-[100%] outline-none border-none' placeholder='Type a message...' />
            </div>
            <div className='flex  items-center'>
            <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <AiFillAudio size={27} className="color"/>
                </div>
                <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <ImAttachment size={23} className="color"/>
                </div>
            </div>
            <div className='rounded-full cursor-pointer  flex items-center justify-center bg p-1'>
            <IoPaperPlaneSharp size={25} className="text-white "/>
            </div>
        </div>
    </div>
  )
}

export default MessageInput