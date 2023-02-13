import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import InputEmoji from "react-input-emoji";
import {BiImageAdd} from 'react-icons/bi'
import {TiDocumentAdd} from 'react-icons/ti'
import {IoPaperPlaneSharp, IoSend} from 'react-icons/io5'
import { DataContext } from '../../context/DataProvider'
import {  useCreateNewGroupMessageMutation, useCreateNewMessageMutation, useFetchGroupMessagesQuery, useFetchPersonalMessagesQuery } from '../../store/services/messageService'
import axios from 'axios'
import {AiOutlineLink, AiOutlineVideoCameraAdd} from 'react-icons/ai'
import { ImSpinner9 } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
const MessageInput = () => {
  const { messages,selectedGroup, setMessages,selectedChat ,groupMessages,
    setGroupMessages} = useContext(DataContext);
  const [message, setMessage] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [isGroupImageUploaded, setIsGroupImageUploaded] = useState(false)
  const [groupMessage, setGroupMessage] = useState("")
  const [isOptionsPopup, setIsOptionsPopup] = useState(false)
  const [image, setImage] = useState("")
  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const [caption, setCaption] = useState("")
  const [videoCaption, setVideoCaption] = useState("")
  const [groupImage, setGroupImage] = useState("") 
  const [uploadVideoUrl, setUploadVideoUrl] = useState("")
  const [groupImageCaption, setGroupImageCaption] = useState("")
  const [sendMessage,res] = useCreateNewMessageMutation()
  const [videoUploading, setVideoUploading] = useState(false)
  const [sendGroupMessage,response] = useCreateNewGroupMessageMutation()
  const { data, isFetching ,refetch:refetchData} = useFetchPersonalMessagesQuery(selectedChat?._id);
  const { data:result, isFetching:gettingData ,refetch} = useFetchGroupMessagesQuery(selectedGroup?._id);
  useEffect(()=>{
    if(res.isSuccess){
      refetchData()
      setIsImageUploaded(false)
      setCaption("")
      setVideoCaption("")
      setIsVideoUploaded(false)
    }
  },[refetchData, res.isSuccess])
  useEffect(()=>{
    if(response.isSuccess){
      refetch()
      setIsGroupImageUploaded(false)
      setGroupImageCaption("")
    }
  },[ refetch, response.isSuccess])
  const hiddenFileInput = useRef(null) 
  const hiddenVideoFileInput = useRef(null) 
  const hiddenGroupFileInput = useRef(null) 
  const hiddenGroupVideoFileInput = useRef(null) 
  const handleSend = () => {
    if(message !== ""){
      sendMessage({message:{type:"text",message},chatId:selectedChat._id})
      setMessage('')
      setMessages([...messages,message])
    }
  }
  const handleGroupImageUpload = async(event) => {
    setImageUploading(true)
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  formData.append('upload_preset', 'mychatapp');
  await axios
    .post('https://api.cloudinary.com/v1_1/dlrujkhvx/image/upload', formData)
    .then((response) => {
      setGroupImage(response.data.secure_url);
      setImageUploading(false)
      setIsGroupImageUploaded(true)
    })
    .catch((error) => {
      console.error(error);
    });
  
};
  const handleImageUpload = async(event) => {
    setIsOptionsPopup(false)
    setImageUploading(true)
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  formData.append('upload_preset', 'mychatapp');
  await axios
    .post('https://api.cloudinary.com/v1_1/dlrujkhvx/image/upload', formData)
    .then((response) => {
      setImage(response.data.secure_url);
      setImageUploading(false)
      setIsImageUploaded(true)
    })
    .catch((error) => {
      console.error(error);
    });
}; 
  const handleImageSend = () => {
    sendMessage({message:{type:"img",message:image,caption},chatId:selectedChat._id})
  }
  const handleVideoSend = () => {
    sendMessage({message:{type:"video",message:uploadVideoUrl,caption:videoCaption},chatId:selectedChat._id})
  }
  const handleGroupImageSend = () => {
    sendGroupMessage({message:{type:"img",message:groupImage,caption:groupImageCaption},groupChatId:selectedGroup._id})
  }
  const handleGroupMessageSend = () => {
    if(groupMessage !== ""){
      sendGroupMessage({message:{type:"text",message:groupMessage},groupChatId:selectedGroup._id})
      setGroupMessage('')
      setGroupMessages([...groupMessages,groupMessage])
    }
  }
  const handleChange = (newMessage)=> {
    setMessage(newMessage)
  }
  const handleVideoUpload = (event) => {
    event.preventDefault();
    setVideoUploading(true)
    const file = event.target.files[0]
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mychatapp");
    formData.append("cloud_name", "dlrujkhvx");
    fetch("https://api.cloudinary.com/v1_1/dlrujkhvx/video/upload", {
      method: "post",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadVideoUrl(data.secure_url);
        console.log(data);
        setIsVideoUploaded(true)
        setVideoUploading(false)
      });
  };
  const handleChangeGroup = (newMessage)=> {
    setGroupMessage(newMessage)
  }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleVideoClick = event => {
    hiddenVideoFileInput.current.click();
  };
  const handleVideoGroupClick = event => {
    hiddenGroupVideoFileInput.current.click();
  };
  const handleGroupInputClick = event => {
    hiddenGroupFileInput.current.click();
  };
  return (
    <div className='w-full rounded-tr-lg  rounded-tl-lg bg-white shadow-lg  shadow-black'>
        { selectedChat?._id && selectedGroup === null ?
          <div className='flex relative  items-center py-2 px-4 gap-2'>
            <InputEmoji
                value={message}
                onChange={handleChange}
                placeholder="Type a message"
              />
            <div className='flex  items-center'>
                <div className='rounded-full  cursor-pointer p-2 hover:bg-gray-100'>
                  <AiOutlineLink className='text-gray-500' size={25} onClick={()=>setIsOptionsPopup(prev => !prev)} />
                  {
                  isImageUploaded &&
                  <div className='absolute bg  px-2 py-2 rounded-lg right-4 bottom-4 z-50 '>
                 <div className='relative'>
                  <div className='absolute right-1 top-1'>
                  <IoMdClose onClick={()=>setIsImageUploaded(false)} color='white' size={25}  />
                  </div>
                  <img src={image}
                  alt="img" className='w-[250px] rounded-lg' />
                  </div>
                  <div className='flex mt-2 gap-4 justify-between items-center'>
                  <input onChange={(e)=>setCaption(e.target.value)} value={caption} type="text" placeholder='Add Caption...' 
                  className='rounded-full grow outline-none border-none px-2 py-2' />
                  {
                    res?.isLoading ? 
                    <ImSpinner9 size={27} color="white" className=" animate-spin"/>
                    : 
                    <IoSend onClick={handleImageSend} size={25} className="text-white "/>
                  }
                  </div>
                </div>
                }
                {
                  isVideoUploaded &&
                  <div className='absolute bg  px-2 py-2 rounded-lg right-4 bottom-4 z-50 '>
                 <div className='relative'>
                  <div className='absolute right-1 top-1'>
                  <IoMdClose onClick={()=>setIsVideoUploaded(false)} color='white' size={25}  />
                  </div>
                  <video  
                   controls
                  alt="video" className='w-[250px] rounded-lg'>
                     <source type="video/mp4" src={uploadVideoUrl} />
                  </video>
                  </div>
                  <div className='flex mt-2 gap-4 justify-between items-center'>
                  <input onChange={(e)=>setVideoCaption(e.target.value)}
                   value={videoCaption} type="text" placeholder='Add Caption...' 
                  className='rounded-full grow outline-none border-none px-2 py-2' />
                  {
                    res?.isLoading ? 
                    <ImSpinner9 size={27} color="white" className=" animate-spin"/>
                    : 
                    <IoSend onClick={handleVideoSend} size={25} className="text-white "/>
                  }
                  </div>
                </div>
                }
               {
                isOptionsPopup && 
                <div className='absolute transition-all rounded-full bg p-2 bottom-16 right-10'>
                <div className='flex rounded-full bg-white p-2  items-center gap-6 flex-col'>
                <BiImageAdd onClick={(e)=>handleClick(e)} size={25} className="text-gray-500"/>
                <input 
                ref={hiddenFileInput}
                onChange={handleImageUpload} accept="image/*" type="file" className='hidden' />
                  <AiOutlineVideoCameraAdd  onClick={(e)=>handleVideoClick(e)} className="text-gray-500" size={25}/>
                <input 
                ref={hiddenVideoFileInput}
                onChange={handleVideoUpload} accept="video/*"  type="file" className='hidden' />

                  <TiDocumentAdd className="text-gray-500"  size={25}/>
                </div>
              </div>
               }
                </div>
            </div>
            <div className='rounded-full cursor-pointer  flex items-center justify-center bg p-1'>
              {
                imageUploading || videoUploading || res?.isLoading ? 
                <ImSpinner9 size={27} color="white" className=" animate-spin"/>
                :
            <IoPaperPlaneSharp onClick={handleSend} size={25} 
            className="text-white"/>
              }
            </div>
        </div> : 
        <div className='flex relative  items-center py-2 px-4 gap-2'>
            <InputEmoji
                value={groupMessage}
                onChange={handleChangeGroup}
                cleanOnEnter/>
            <div className='flex  items-center'>
                <div className='rounded-full cursor-pointer p-2 hover:bg-gray-100'>
                <BiImageAdd onClick={(e)=>handleGroupInputClick(e)} size={23} className="text-gray-500"/>
                <input 
                ref={hiddenGroupFileInput}
                onChange={handleGroupImageUpload} accept="image/*" type="file" className='hidden' />
                {
                  isGroupImageUploaded &&
                  <div className='absolute bg  px-2 py-2 rounded-lg right-2 bottom-2 z-50 '>
                 <div className='relative'>
                  <div className='absolute right-1 top-1'>
                  <IoMdClose onClick={()=>setIsGroupImageUploaded(false)} color='white' size={25}  />
                  </div>
                  <img src={groupImage}
                  alt="img" className='w-[300px] rounded-lg' />
                  </div>
                  <div className='flex mt-2 gap-4 justify-between items-center'>
                  <input onChange={(e)=>setGroupImageCaption(e.target.value)}
                   value={groupImageCaption} type="text" placeholder='Add Caption...' 
                  className='rounded-full grow outline-none border-none px-2 py-2' />
                  {
                    response?.isLoading ? 
                    <ImSpinner9 size={27} color="white" className=" animate-spin"/>
                    : 
                    <IoSend onClick={handleGroupImageSend} size={25} className="text-white "/>
                  }
                  </div>
                </div>
                }
                </div>
            </div>
            <div className='rounded-full cursor-pointer  flex items-center justify-center bg p-1'>
            {
                imageUploading || response?.isLoading ? 
                <ImSpinner9 size={27} color="white" className=" animate-spin"/>
                :
            <IoPaperPlaneSharp onClick={handleGroupMessageSend} size={25} className="text-white "/>
}
            </div>
        </div>
        }
    </div>
  )
}

export default MessageInput