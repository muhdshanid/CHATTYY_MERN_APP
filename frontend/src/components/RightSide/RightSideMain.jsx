import React from "react";
import { HiUserAdd } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const RightSideMain = ({selectedChat,selectedGroup}) => {
  const {user} = useSelector(state => state.authReducer)
  let otherUser = selectedChat?.users?.filter(usr => usr._id !== user._id)
  const dummyProfile =
    "data:image/jpeg;base64,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";

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
        src={dummyProfile}
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
          <h6>2</h6>
          <IoIosArrowForward size={20} className="color"/>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4 items-center ">
        <div>
          <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
        </div>
        <div>
          <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
        </div>
        <div>
          <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
        </div>
        
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
      src={dummyProfile}
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
        <h6>2</h6>
        <IoIosArrowForward size={20} className="color"/>
      </div>
    </div>
    <div className="flex gap-2 px-4 pb-4 items-center ">
      <div>
        <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
      </div>
      <div>
        <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
      </div>
      <div>
        <img src={dummyProfile} alt="media" className="rounded-lg w-20 h-20 object-cover" />
      </div>
      
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
              <img src={dummyProfile}  className="w-12 h-12 hover:w-14
                hover:h-14
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
