import React, { useContext } from "react";
import { HiUserAdd } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { DataContext } from "../../context/DataProvider";

const RightSideMain = ({selectedChat,selectedGroup}) => {
  const {user} = useSelector(state => state.authReducer)
  const { messages ,groupMessages,setMediaPageOpen} = useContext(DataContext);
  let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
  const mediaMessages = messages?.filter(msg => msg.message.type !== "text")
  const groupMediaMessages = groupMessages?.filter(msg => msg.message.type !== "text")
  return (
    <div className="w-full h-[28pc] overflow-hidden overflow-y-scroll ">
   {
    selectedChat !== null && selectedGroup === null ? 
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
  :
  <div className="flex flex-col gap-4 p-4">
  <div className="flex  items-center justify-center">
    <img
      className="w-[10rem]
       h-[10rem] 
          rounded-full shadow-xl"
      src={selectedGroup.groupProfile}
      alt="profile"
    />
  </div>

  <div className="flex  w-full items-center justify-center gap-2">
    <div className="flex flex-col items-center gap-1">
    <h6 className="text-black text-2xl font-semibold">{selectedGroup.groupName}</h6>
    <div className="flex items-center justify-center">
    </div>
    </div>
  </div>

 {
  selectedGroup.description ?  <div className="bg-gray-100 rounded-lg">
  <div className="flex p-2 flex-col w-80 gap-2">
    <div className="flex items-center justify-between">
      <h6 className="text-black font-semibold">Description</h6>
    </div>
    <div className="w-full">
    <p className="text-black break-words font-normal ">
    {selectedGroup.description}
    </p></div> 
  </div>
</div> : ""
 }
  <div className="bg-gray-100 rounded-lg">
    <div className="flex p-4 items-center justify-between ">
      <div className="">
        <h6 className="font-normal text-sm ">Media,links and docs</h6>
      </div>
      <div className="flex gap-1 items-center">
        <h6>{groupMediaMessages.length}</h6>
        <IoIosArrowForward  onClick={()=>setMediaPageOpen(true)} size={20} className="color cursor-pointer"/>
      </div>
    </div>
    <div className="flex gap-2 px-4 pb-4 items-center ">
    {
          groupMediaMessages?.slice(0,3)?.map(msg => (
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
    <div className="bg-gray-100 rounded-lg">
      <div className="flex p-2 items-center gap-4">
      <HiUserAdd size={27} className="color cursor-pointer"/>
      <h6 className="">Add new member</h6>
      </div>
    </div>
    <div className="bg-gray-100 rounded-lg">
      <div className="flex p-2">
        <h6>{selectedGroup.groupMembers.length} members</h6>
      </div>
    <div className="flex p-2 flex-col justify-center gap-4">
      {
        selectedGroup.groupMembers.map(usr => (
          <div className="flex items-center gap-4">
            <div>
              <img src={usr.profile}  className="w-12 h-12
                transition-all rounded-full shadow-xl" alt="dp" />
            </div>
            <div>
              <h6>{usr.name}</h6>
            </div>
          </div>
        ))
      }
      </div>
    </div>
</div>
   }
  </div>
  );
};

export default RightSideMain;
