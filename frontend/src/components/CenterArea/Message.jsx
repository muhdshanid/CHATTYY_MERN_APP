import React from "react";
import {format} from 'timeago.js'
import { useSelector } from "react-redux";
const Message = ({message}) => {
  const {user} = useSelector(state => state.authReducer)
  let messageTime = format(message?.createdAt)
  return (
    <div>
    {
      message.sender?._id !== user._id ? 
      <div   className="w-full float-left flex items-center gap-2">
      {message?.message?.message && <div>
        <img
          className="w-10
           h-10
              rounded-full shadow-xl"
          src={message?.message?.profile ? message?.message?.profile : message?.sender?.profile}
          alt="profile"
        />
      </div>}
      <div className=" py-2 px-4   ">
    {message.message.type === "text" ?
    <div className=" py-2 px-4 rounded-br-lg  rounded-bl-lg rounded-tr-lg bg-white shadow-sm border">
     <p className="text-black max-w-[20rem]">
     {message.message.message}
    </p>
    </div>
     : message.message.type === "img" ? 
     <div className=" py-1 px-1 rounded-br-lg border flex flex-col gap-2 rounded-bl-lg rounded-tr-lg bg-white shadow-sm">
     <img src={message.message.message} className="w-[200px]  rounded-lg" alt="img-chat" />
     <p className="text-black px-2 break-words w-[200px]">
      {message.message.caption !== "" ? message.message.caption : ""}</p> 
     </div>
     : message.message.type === "video" ? 
     <div className=" py-1 px-1 border rounded-br-lg flex flex-col gap-2 rounded-bl-lg rounded-tr-lg bg-white shadow-sm">
      <video controls className='w-[250px] rounded-lg' >
        <source type="video/mp4" src={message.message.message} />
      </video>
      <p className="text-black px-2 break-words w-[200px]">
      {message.message.caption !== "" ? message.message.caption : ""}</p> 
      </div>
      : ""
    }
    <div className="">
    <p className="text-black text-xs font-normal">{messageTime}</p>
</div>
        {/* <p className="max-w-[20rem]">{message?.message?.message}</p>
       {
        message?.message?.message &&  <p>{messageTime}</p>
       } */}
      </div>
    </div>
    : <div  className="w-full flex flex-col justify-center items-end gap-2">
    
      {message.message.type === "text" ?
      <div className=" py-2 px-4 rounded-tl-lg  rounded-bl-lg rounded-tr-lg bg shadow-sm">
       <p className="text-white max-w-[20rem]">
       {message.message.message}
      </p>
      </div>
       : message.message.type === "img" ? 
       <div className=" py-1 px-1 rounded-tl-lg flex flex-col gap-2 rounded-bl-lg rounded-tr-lg bg shadow-sm">
       <img src={message.message.message} className="w-[200px]  rounded-lg" alt="img-chat" />
       <p className="text-white px-2 break-words w-[200px]">
        {message.message.caption !== "" ? message.message.caption : ""}</p> 
       </div>
       : message.message.type === "video" ? 
       <div className=" py-1 px-1 rounded-tl-lg flex flex-col gap-2 rounded-bl-lg rounded-tr-lg bg shadow-sm">
        <video controls className='w-[250px] rounded-lg' >
          <source type="video/mp4" src={message.message.message} />
        </video>
        <p className="text-white px-2 break-words w-[200px]">
        {message.message.caption !== "" ? message.message.caption : ""}</p> 
        </div>
        : ""
      }
      <div className="">
      <p className="text-black text-xs font-normal">{messageTime}</p>
      </div>
  </div>
    }
    </div>
  );
};

export default Message;
 