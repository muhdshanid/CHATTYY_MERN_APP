import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import {BiImageAdd} from 'react-icons/bi'
import {TiDocumentAdd} from 'react-icons/ti'
import { IoSend} from 'react-icons/io5'
import axios from 'axios'
import {AiOutlineLink, AiOutlineVideoCameraAdd} from 'react-icons/ai'
import { ImSpinner9 } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaSmile } from 'react-icons/fa';
import { useCreateNewMessageMutation, useFetchPersonalMessagesQuery } from '../../../store/services/messageService'
import { DataContext } from '../../../context/DataProvider'
import { useSocket } from '../../../context/SocketProvider'
const PersonalMessageInput = () => {
    const {socket} = useSocket()
    const {user} = useSelector(state => state.authReducer)
    const {selectedChat ,} = useContext(DataContext);
    const [message, setMessage] = useState("")
    const [imageUploading, setImageUploading] = useState(false)
    const [isImageUploaded, setIsImageUploaded] = useState(false)
    const [isOptionsPopup, setIsOptionsPopup] = useState(false)
    const [image, setImage] = useState("")
    const [isVideoUploaded, setIsVideoUploaded] = useState(false)
    const [caption, setCaption] = useState("")
  
    const [videoCaption, setVideoCaption] = useState("")
    const [uploadVideoUrl, setUploadVideoUrl] = useState("")
  
    const [sendMessage,res] = useCreateNewMessageMutation()
    const [videoUploading, setVideoUploading] = useState(false)
    const { data, isFetching ,refetch:refetchData} = useFetchPersonalMessagesQuery(selectedChat?._id);
    useEffect(()=>{
      if(res.isSuccess){
        refetchData()
        setIsImageUploaded(false)
        setCaption("")
        setVideoCaption("")
        setIsVideoUploaded(false)
      }
    },[refetchData, res.isSuccess])
   
    const hiddenFileInput = useRef(null) 
    const hiddenVideoFileInput = useRef(null) 
  
  
    const handleSend = () => {
      if(message !== ""){
        let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
          socket.emit("sendMsg",{
            receiver:otherUser[0]?.name,
            message:message,
            type:"text"
          }) 
          sendMessage({message:{type:"text",message},chatId:selectedChat._id})
          setMessage('')
      }
    }
  
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
      let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
          socket.emit("sendMsg",{
            receiver:otherUser[0]?.name,
            message:image,
            type:"img",
            caption
          })
      sendMessage({message:{type:"img",message:image,caption},chatId:selectedChat._id})
    }
    const handleVideoSend = () => {
      let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
          socket.emit("sendMsg",{
            receiver:otherUser[0]?.name,
            message:uploadVideoUrl,
            type:"video",
            caption:videoCaption
          }) 
      sendMessage({message:{type:"video",message:uploadVideoUrl,caption:videoCaption},chatId:selectedChat._id})
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
    
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    const handleVideoClick = event => {
      hiddenVideoFileInput.current.click();
    };
  return (
    <>
        <div className='flex items-center '>
                <FaSmile className='color' size={25}/>
              </div>
              <input className='grow px-4 py-2 outline-none rounded-full border -none'
              value={message} placeholder="Type a message"
                onChange={(e)=>setMessage(e.target.value)} type="text" />
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
                <div className='absolute transition-all rounded-full bg p-2 bottom-16 right-12'>
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
            <div onClick={handleSend} className=' cursor-pointer
              flex items-center justify-center p-1'>
              {
                imageUploading || videoUploading || res?.isLoading ? 
                <ImSpinner9 size={27} color="black" className=" animate-spin"/>
                :
            <IoSend  size={25} 
            className="color"/>
              }
            </div>
    </>
  )
}

export default PersonalMessageInput