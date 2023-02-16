import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import {format} from 'timeago.js'
import { FaCircle } from "react-icons/fa";
import {BsCameraVideoFill, BsImageFill} from 'react-icons/bs'
import { useSelector } from "react-redux";
import {MdSmsFailed} from 'react-icons/md'
import { DataContext } from "../../context/DataProvider";
import {ImSpinner9} from 'react-icons/im'
import { useFetchGroupChatsQuery, useFetchPersonalChatsQuery } from "../../store/services/chatServices";
import { IoSearchCircleSharp } from "react-icons/io5";
const Chats = () => {
  const {setSelectedChat,
    setSelectedGroup,setSearchPageOpen,selectedChat
    ,setAddGroupMembersPageOpen,selectedGroup,messages} = useContext(DataContext)
  const [personalChats, setPersonalChats] = useState([]);
  const [isPeoplesList, setIsPeoplesList] = useState(true)
  const [groupsChats, setGroupsChats] = useState([])
  const [search, setSearch] = useState("")
  const {user} = useSelector(state => state.authReducer)
  const { data, isFetching ,refetch} = useFetchPersonalChatsQuery();
  const {data : result,isFetching : gettingData} = useFetchGroupChatsQuery()
  useEffect(() => {
    if(isFetching === false){
      setPersonalChats(data);
    }
  }, [data, isFetching]);
  useEffect(()=>{
    refetch()
  },[messages, refetch])
  useEffect(() => {
    if(gettingData === false){
      setGroupsChats(result);
    }
  }, [gettingData, result]);
  return (
    <div className="flex  flex-col gap-4">
      <div className="p-2 mt-2 items-center gap-2 shadow-xl bg-white rounded-lg flex">
        <div>
            <button
              className="px-2 py-1  rounded-full  text-white"
            >
              <IoSearchCircleSharp size={30} className="bg rounded-full" color="white"/>
            </button>
          </div>
          <input
            value={search}
            onChange={(e) =>setSearch(e)}
            type="text"
            placeholder="Find a user..."
            className=" w-full px-1 placeholder:text-purple-300 border-none rounded-full outline-none"
          />
        </div>
      <div className="flex items-center  justify-center gap-4 ">
        <div onClick={()=>setIsPeoplesList(true)} className={`relative rounded-lg
         py-2 px-2  ${isPeoplesList ? "shadow-md " : " shadow-sm"} cursor-pointer`}>
          <h6 className="font-semibold text-md ">People</h6>
          {isPeoplesList &&<div className="absolute right-1.5  color transition-all">________</div>}
        </div>
        <div onClick={()=>setIsPeoplesList(false)} className={`relative
         cursor-pointer rounded-lg
         py-2 px-2  ${!isPeoplesList ? "shadow-md " : "shadow-sm"} `}>
          <h6 className="font-semibold text-md ">Groups</h6>
          {!isPeoplesList &&<div className="absolute  right-1.5 color transition-all">________</div>}

        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden overflow-y-scroll h-[25.5pc]">
      {
       isPeoplesList ? isFetching  ? <div className="w-full h-[70%]
        flex justify-center flex-col gap-2 items-center">
        <ImSpinner9 size={40} className=" animate-spin"/>
        <p className=" font-semibold text-lg capitalize text-purple-900">Loading Chats...</p>
       </div>
        : personalChats?.length > 0 ? personalChats?.map(chat =>{
          let otherUser = chat.users.filter(usr => usr?._id !== user?._id)
          let latestMessageTime = ""
          if(chat.latestMessage){
           latestMessageTime =format(chat?.latestMessage.createdAt)
          }
          return (
          <div key={chat._id} onClick={()=>{setSelectedChat(chat)
          setSelectedGroup(null)}}
          className={`flex items-center 
          ${
            selectedChat?._id === chat?._id ? "bg " : "bg-white hover:bg-gray-100"
          } cursor-pointer gap-1 h-[4.5rem]
           px-2 shadow-xl  rounded-xl`}
        >
          <div className="w-14  h-14 py- flex items-center justify-center">
            <img
              className="w-12 h-12 hover:w-14
                hover:h-14
                transition-all rounded-full shadow-xl"
              src={otherUser[0].profile}
              alt="profile"
            />
          </div>
          <div className="flex flex-col grow gap-0  justify-end">
            <h6
              className={`font-semibold leading-7 ${
                selectedChat?._id === chat?._id ? "text-white" : ""
              } text-base`}
            >
             {
              otherUser[0].name
             }
            </h6>
            <p
              className={`font-normal text-sm ${selectedChat?._id === chat?._id ? "text-white" : ""}`}
            >
              {
                chat?.latestMessage?.message?.type === "text" ? 
                chat?.latestMessage?.message.message.length > 25
                        ? chat?.latestMessage?.message.message.substring(0, 26) + "..."
                        : chat?.latestMessage?.message.message
                        :
                        chat?.latestMessage?.message?.type === "img" ?
                        <>
                        <BsImageFill 
                        className={`${selectedChat?._id === chat?._id ? "text-white" : ""}`} size={15}/>
                        </>
                        : chat?.latestMessage?.message?.type === "video" ?
                        <>
                        <BsCameraVideoFill size={18} />
                        </>
                        : ""
              }
            </p>
          </div>
         { chat.latestMessage && <div className="relative flex flex-col mt-2 items-center justify-end gap-1">
            <p
              className={`font-normal text-sm ${selectedChat?._id === chat?._id ? "text-white" : ""}`}
            >
              {
                latestMessageTime 
              }
            </p>
          </div>}
        </div>
        )})
        : <div className="w-full h-[70%]
        flex justify-center flex-col gap-2 items-center">
        <MdSmsFailed size={40} className=""/>
        <p className=" font-semibold text-lg capitalize text-purple-900">No chats yet!</p>
        <button onClick={()=>setSearchPageOpen(true)} className="capitalize  hover:bg-purple-800  bg rounded-md  text-white py-2 px-4 font-semibold ">create new chat</button>
       </div>
         : gettingData ? <div className="w-full h-[70%]
         flex justify-center flex-col gap-2 items-center">
         <ImSpinner9 size={40} className=" animate-spin"/>
         <p className=" font-semibold text-lg capitalize text-purple-900">Loading Chats...</p>
        </div> : groupsChats?.length > 0 ? groupsChats?.map(chat => {
          let latestMessageTime = ""
          if(chat.latestMessage){
           latestMessageTime =format(chat?.latestMessage?.createdAt)
          }
          return (
            <div key={chat._id}
            onClick={()=>{setSelectedGroup(chat)
              setSelectedChat(null)}}
            className={`flex items-center 
            ${
              selectedGroup?._id === chat?._id ? "bg " : "bg-white hover:bg-gray-100"
            } cursor-pointer gap-1 h-[4.5rem]
             px-2 shadow-xl  rounded-xl`}
          >
            <div className="w-14  h-14 py- flex items-center justify-center">
              <img
                className="w-12 h-12 hover:w-14
                  hover:h-14
                  transition-all rounded-full shadow-xl"
                src={chat.groupProfile}
                alt="profile"
              />
            </div>
            <div className="flex flex-col grow gap-0  justify-end">
              <h6
                className={`font-semibold leading-7 ${
                   selectedGroup?._id === chat?._id  ? "text-white" : ""
                } text-base`}
              >
                {chat.groupName}
              </h6>
              <p
                className={`font-normal text-sm ${ selectedGroup?._id === chat?._id  ? "text-white" : ""}`}
              >
                {
                chat?.latestMessage?.message?.type === "text" ? 
                chat?.latestMessage?.message.message.length > 25
                        ? chat?.latestMessage?.message.message.substring(0, 26) + "..."
                        : chat?.latestMessage?.message.message
                        :
                        chat?.latestMessage?.message?.type === "img" ?
                        <>
                        <BsImageFill 
                        className={`${selectedChat?._id === chat?._id ? "text-white" : ""}`} size={15}/>
                        </>
                        : chat?.latestMessage?.message?.type === "video" ?
                        <>
                        <BsCameraVideoFill size={18} />
                        </>
                        : ""
              }
              </p>
            </div>
          { chat.latestMessage && <div className="relative  flex  mt-2 items-end justify-end gap-1">
              <p
                className={`font-normal text-sm ${ selectedGroup?._id === chat?._id  ? "text-white" : ""}`}
              >
               {latestMessageTime}
              </p>
            </div>}
           </div>
          )
        }) :
        <div className="w-full h-[70%]
        flex justify-center flex-col gap-2 items-center">
        <MdSmsFailed size={40} className=""/>
        <p className=" font-semibold text-lg capitalize text-purple-900">No groups yet!</p>
        <button onClick={()=>setAddGroupMembersPageOpen(true)} className="capitalize 
         hover:bg-purple-800  bg rounded-md  text-white py-2 px-4 font-semibold ">create new group</button>
       </div>
       }
      </div>
    </div>
  );
};

export default Chats;
