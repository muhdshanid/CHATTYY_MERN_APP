import React, { useContext } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from "react-redux";
import { DataContext } from '../../../context/DataProvider';

const PersonalChatRightSide = ({selectedChat}) => {
    const {user} = useSelector(state => state.authReducer)
    const { messages ,setMediaPageOpen} = useContext(DataContext);
    let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
  const mediaMessages = messages?.filter(msg => msg.message.type !== "text")
  return (
    <div className="flex flex-col gap-4 p-4">
    <div className="flex  items-center justify-center">
      <img
        className="w-[10rem]
         h-[10rem] 
            rounded-full shadow-xl"
        src={otherUser[0].profile}
        alt="profile"
      />
    </div>
    <div className="flex  w-full items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-1">
      <h6 className="text-black text-2xl font-semibold">{otherUser[0].name}</h6>
      <div className="flex items-center justify-center">
      <p className="text-sm font-normal">{otherUser[0].email}</p>
      </div>
      </div>
    </div>

   {
    otherUser[0].about ?  <div className="bg-gray-100 rounded-lg">
    <div className="flex p-2 flex-col gap-2">
      <div className="flex items-center justify-between">
        <h6 className="text-black font-semibold">About</h6>
      </div>
      <p className="text-black font-normal">
       {
        otherUser[0].about
       }
      </p>
    </div>
  </div> : ""
   }
    <div className="bg-gray-100 rounded-lg">
      <div className="flex p-4 items-center justify-between ">
        <div className="">
          <h6 className="font-normal text-sm ">Media,links and docs</h6>
        </div>
        <div className="flex gap-1 items-center">
          <h6>{mediaMessages?.length}</h6>
          <IoIosArrowForward onClick={()=>setMediaPageOpen(true)} size={20} className="color cursor-pointer"/>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4 items-center ">
        {
          mediaMessages?.slice(0,3)?.map(msg => (
            msg.message.type === "img" ? 
            <div>
            <img src={msg.message.message} alt="media" className="rounded-lg w-20 h-20 object-cover" />
          </div>
          : 
          <div>
          <video src={msg.message.message} alt="media" className="rounded-lg w-20 h-20 object-cover" />
        </div>
          ))
        }
      </div>
    </div>
  </div>
  )
}

export default PersonalChatRightSide