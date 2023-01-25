import React, { useContext } from 'react'
import { useState } from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { FaSmile } from 'react-icons/fa'
import {ImAttachment} from 'react-icons/im'
import {IoPaperPlaneSharp} from 'react-icons/io5'
import { DataContext } from '../../context/DataProvider'
import { useCreateNewGroupMessageMutation, useCreateNewMessageMutation } from '../../store/services/messageService'
const MessageInput = ({selectedChat,selectedGroup}) => {
  const { messages, setMessages ,groupMessages,
    setGroupMessages} = useContext(DataContext);
  const [message, setMessage] = useState("")
  const [groupMessage, setGroupMessage] = useState("")
  const [sendMessage,res] = useCreateNewMessageMutation()
  const [sendGroupMessage,response] = useCreateNewGroupMessageMutation()
  const handleSend = () => {
    if(message !== ""){
      sendMessage({content:message,chatId:selectedChat._id})
      setMessage('')
      setMessages([...messages,message])
    }
  }
  const handleGroupMessageSend = () => {
    if(groupMessage !== ""){
      sendGroupMessage({content:groupMessage,groupChatId:selectedGroup._id})
      setGroupMessage('')
      setGroupMessages([...groupMessages,groupMessage])
    }
  }
  const typingHandler = (e) => {
    setMessage(e.target.value)
  }
  const groupTypingHandler = (e) => {
    setGroupMessage(e.target.value)
  } 
  return (
    <div className='w-full rounded-tr-lg  rounded-tl-lg bg-white shadow-lg  shadow-black'>
        { selectedChat !== null && selectedGroup === null ?
          <div className='flex  items-center py-2 px-4 gap-2'>
        <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <FaSmile size={27} className="color"/>
            </div>
            <div className='grow '>
                <input type="text"
                onChange={typingHandler}
                value={message}
                 className='w-[100%] outline-none border-none' placeholder='Type a message...' />
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
            <IoPaperPlaneSharp onClick={handleSend} size={25} className="text-white "/>
            </div>
        </div> : 
        <div className='flex  items-center py-2 px-4 gap-2'>
        <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <FaSmile size={27} className="color"/>
            </div>
            <div className='grow '>
                <input type="text"
                onChange={groupTypingHandler}
                value={groupMessage}
                 className='w-[100%] outline-none border-none' placeholder='Type a message...' />
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
            <IoPaperPlaneSharp onClick={handleGroupMessageSend} size={25} className="text-white "/>
            </div>
        </div>
        }
    </div>
  )
}

export default MessageInput