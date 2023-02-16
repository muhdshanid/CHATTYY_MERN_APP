import React,{useContext, useState} from 'react'
import { HiUserAdd } from "react-icons/hi";
import {MdModeEditOutline} from 'react-icons/md'
import { ImSpinner9 } from "react-icons/im";
import { IoIosArrowForward, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { DataContext } from "../../../context/DataProvider";
import { useRemoveUserMutation, useUpdateGroupMutation } from "../../../store/services/chatServices";
import { useEffect } from "react"; 
const GroupChatRightSide = ({selectedGroup}) => {
    const [description, setDescription] = useState(selectedGroup?.description)
  const [isNameEdit, setIsNameEdit] = useState(false)
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
  const [groupName, setGroupName] = useState(selectedGroup?.groupName)
  const {user} = useSelector(state => state.authReducer)
  const [updateGroup,res] = useUpdateGroupMutation()
  const { groupMessages,setMediaPageOpen,setAddMemberPage} = useContext(DataContext);
  const {setSelectedGroup} = useContext(DataContext)
  const [remove,result] = useRemoveUserMutation()
  const groupMediaMessages = groupMessages?.filter(msg => msg.message.type !== "text")
  useEffect(()=>{
    if(res.isSuccess){
      setSelectedGroup(res.data)
      setIsNameEdit(false)
      setIsDescriptionEdit(false)
    }
  },[res?.data, res?.isSuccess, setSelectedGroup])
  useEffect(()=>{
    if(result.isSuccess){
      setSelectedGroup(result.data)
    }
  },[result?.data, result?.isSuccess, setSelectedGroup])
  const editGroupName = (id) => {
    updateGroup({id,data:{groupName}}) 
  } 
  const updateDesc = (id) => {
    updateGroup({id,data:{description}}) 
  }
  const removeUser = (userId) => {
    if(user?._id === selectedGroup.groupAdmin){
        remove({userId,groupId:selectedGroup?._id})
    } 
  }
  return (
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
      <div className="flex  items-center gap-1">
      {
                isNameEdit ?
                <>
                 <input type="text" onChange={(e)=>setGroupName(e.target.value)} 
                value={groupName}
                className='
                outline-none  border-purple-500 border w-full  py-2 px-4 rounded-lg '/>
                <IoMdClose onClick={()=>{
                  setIsNameEdit(false)
                  setGroupName(selectedGroup.groupName)
                }} size={30} className="color cursor-pointer" />
                {
                  res?.isLoading ? 
             <ImSpinner9 size={27} className=" animate-spin"/>
                  :
                  <IoMdCheckmark onClick={()=>editGroupName(selectedGroup._id)} size={30} className="color cursor-pointer" />
                }
                </> 
                :
                <>
                <h6 className="text-black text-xl font-semibold py-[3px]">{selectedGroup.groupName}</h6>
                {
                  user._id === selectedGroup.groupAdmin &&
              <MdModeEditOutline onClick={()=>setIsNameEdit(true)} size={20} className="color cursor-pointer" />
                }
                </>
              }
      <div className="flex items-center justify-center">
      </div>
      </div>
    </div>
  
   {
    selectedGroup.description ?  <div className="bg-gray-100 rounded-lg">
    <div className="flex p-2  items-center w-80 gap-2">
      {
                isDescriptionEdit ?
                <>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} 
                value={description}
                className='
                outline-none  border-purple-500 border w-full  py-2 px-4 rounded-lg '/>
                <IoMdClose onClick={()=>{
                  setIsDescriptionEdit(false)
                  setDescription(selectedGroup.description)
                }} size={30} className="color cursor-pointer" />
                {
                  res?.isLoading ? 
             <ImSpinner9 size={27} className=" animate-spin"/>
                  :
                  <IoMdCheckmark onClick={()=>updateDesc(selectedGroup._id)} size={30} className="color cursor-pointer" />
                }
                </> 
                :
                <div className="flex flex-col w-full gap-2  justify-between">
                <div className="flex justify-between items-center ">
                <div className="flex items-center justify-between">
                <h6 className="text-black font-semibold">Description</h6>
              </div>
                <MdModeEditOutline onClick={()=>setIsDescriptionEdit(true)} size={25} className="color 
                 cursor-pointer content-end" />
                </div>
      <div className="w-full">
      <p className="text-black break-words font-normal ">
      {selectedGroup.description}
      </p></div> 
                </div> 
              }
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
        <HiUserAdd onClick={()=>setAddMemberPage(true)} size={27} className="color cursor-pointer"/>
        <h6 className="font-semibold text-lg">Add new member</h6>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg">
        <div className="flex px-4 py-2">
          <h6 className="font-semibold text-lg">{selectedGroup.groupMembers.length} members</h6>
        </div>
      <div className="flex px-4 py-2 flex-col justify-center gap-4">
        {
          selectedGroup.groupMembers.map(usr => (
            <div className="flex items-center gap-4">
              <div>
                <img src={usr.profile}  className="w-12 h-12
                  transition-all rounded-full shadow-xl" alt="dp" />
              </div>
              <div className="flex items-center w-[80%]  justify-between">
                <div>
                <h6 className="font-semibold text-lg">{usr.name}</h6>
                </div>
                {
                  usr._id === selectedGroup.groupAdmin ?
                 <div className="bg-white border px-2  border-green-500 rounded-full">
                   <h6 className="text-green-500 text-sm font-semibold">Group admin</h6>
                 </div>
                 :
                 user._id === selectedGroup.groupAdmin ?
                 <div onClick={()=>removeUser(usr._id)} className="bg-white cursor-pointer border px-2  border-rose-500 rounded-full">
                 <h6 className="text-rose-500 text-sm font-semibold">remove</h6>
               </div>
               : ""
                }
              </div>
            </div>
          ))
        }
        </div>
      </div>
  </div>
  )
}

export default GroupChatRightSide