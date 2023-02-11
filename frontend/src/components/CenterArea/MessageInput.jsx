import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { FaSmile } from 'react-icons/fa'
import {BiImageAdd} from 'react-icons/bi'
import { ReactMic } from "react-mic";
import {IoClose, IoPaperPlaneSharp} from 'react-icons/io5'
import { DataContext } from '../../context/DataProvider'
import { useCreateNewAudioMutation, useCreateNewGroupMessageMutation, useCreateNewImageMessageMutation, useCreateNewMessageMutation } from '../../store/services/messageService'
const MessageInput = () => {
  const { messages,selectedGroup, setMessages,selectedChat ,groupMessages,
    setGroupMessages} = useContext(DataContext);
  const [message, setMessage] = useState("")
  const [groupMessage, setGroupMessage] = useState("")
  const [sendMessage,res] = useCreateNewMessageMutation()
  const [record, setRecord] = useState(false)
  const [file, setFile] = useState(null)
  const [sendGroupMessage,response] = useCreateNewGroupMessageMutation()
  const [createAudioMessage,result] = useCreateNewAudioMutation()
  const [createImageMessage,resp] = useCreateNewImageMessageMutation()
  const hiddenFileInput = useRef(null);
  console.log(resp);
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
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const onData = (recordedBlob) => {
  };
  const handleChange = event => {
    setFile(event.target.files[0]);
    if(file !== null){
      const formData = new FormData();
    formData.append("imageMsg", file, file.name);
    createImageMessage({formData,chatId:selectedChat._id})
    }
 }; 
  const onStop =  (file) => {
    const formData = new FormData();
    formData.append("track", file.blob);
    createAudioMessage({formData,chatId:selectedChat._id})
  };
  return (
    <div className='w-full rounded-tr-lg  rounded-tl-lg bg-white shadow-lg  shadow-black'>
        { selectedChat?._id && selectedGroup === null ?
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
            <ReactMic
        record={record}
        onStop={onStop}
        onData={onData}
        visualSetting="frequencyBars"
        className={`absolute
         h-10 ${record ? "" : "hidden"} rounded-lg border w-[15%] bottom-6 right-[12rem]`}
        strokeColor="#000000"
        backgroundColor="#D3D3D3"
        echoCancellation="true"
        channelCount="2"
        
      />
               {
        record ? 
        <IoClose onClick={()=>setRecord(false)} size={27} className="color"/>    :  
           <AiFillAudio onClick={()=>setRecord(true)} size={27} className="color"/>
      }
                </div>
                <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <BiImageAdd onClick={(e)=>handleClick(e)} size={23} className="color"/>
                <input 
                ref={hiddenFileInput}
                onChange={handleChange} type="file" className='hidden' />
                </div>
            </div>
            <div className='rounded-full cursor-pointer  flex items-center justify-center bg p-1'>
            <IoPaperPlaneSharp onClick={handleSend} size={25} className="text-white "/>
            </div>
        </div> : 
        <div className='flex relative  items-center py-2 px-4 gap-2'>
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
              <ReactMic
        record={record}
        onStop={onStop}
        onData={onData}
        visualSetting="frequencyBars"
        className={`absolute h-10 ${record ? "" : "hidden"} rounded-lg border w-[20%] bottom-2 right-[10rem]`}
        strokeColor="#000000"
        backgroundColor="#D3D3D3"
        echoCancellation="true"
        channelCount="2"
        
      />
      {
        record ? 
        <IoClose onClick={()=>setRecord(false)} size={27} className="color"/>    :  
           <AiFillAudio onClick={()=>setRecord(true)} size={27} className="color"/>
      }
                </div>
                <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <BiImageAdd onClick={(e)=>handleClick(e)} size={23} className="color"/>
                <input 
                ref={hiddenFileInput}
                onChange={handleChange} type="file" className='hidden' />
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