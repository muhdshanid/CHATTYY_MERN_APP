import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import {MdSmsFailed} from 'react-icons/md'
import { DataContext } from "../../context/DataProvider";
import {ImSpinner9} from 'react-icons/im'
import { useFetchGroupChatsQuery, useFetchPersonalChatsQuery } from "../../store/services/chatServices";
const Chats = () => {
  const {setSelectedChat,
    setSelectedGroup,setSearchPageOpen, setAddGroupMembersPageOpen} = useContext(DataContext)
  const [inputActive, setInputActive] = useState(false);
  const [selected, setSelected] = useState(false);
  const [personalChats, setPersonalChats] = useState([]);
  const [isPeoplesList, setIsPeoplesList] = useState(true)
  const [groupsChats, setGroupsChats] = useState([])
  const {user} = useSelector(state => state.authReducer)
  const { data, isFetching } = useFetchPersonalChatsQuery();
  const {data : result,isFetching : gettingData} = useFetchGroupChatsQuery()
  useEffect(() => {
    if(isFetching === false){
      setPersonalChats(data);
    }
  }, [data, isFetching]);
  useEffect(() => {
    if(gettingData === false){
      setGroupsChats(result);
    }
  }, [gettingData, result]);
  const dummyProfile =
    "data:image/jpeg;base64,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";

  return (
    <div className="flex  flex-col gap-4">
      <div className={`p-2 mt-2 items-center gap-2 shadow-md bg-white rounded-lg flex`}>
        {!inputActive ? (
          <BiSearch size={27} className="transition-all  color" />
        ) : (
          <HiOutlineArrowLeft
            onClick={() => setInputActive(false)}
            size={27}
            className="transition-all  cursor-pointer color"
          />
        )}
        <input
          onBlur={() => setInputActive(false)}
          onClick={() => setInputActive(true)}
          type="text"
          placeholder="Find an angel..."
          className=" w-full  placeholder:text-purple-300 border-none rounded-lg outline-none"
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
           latestMessageTime =new Date(chat?.latestMessage?.createdAt)
           .toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
          }
          return (
          <div key={chat._id} onClick={()=>{setSelectedChat(chat)
          setSelectedGroup(null)}}
          className={`flex items-center 
          ${
            selected ? "bg " : "bg-white hover:bg-gray-100"
          } cursor-pointer gap-1 h-[4.5rem]
           px-2 shadow-xl  rounded-xl`}
        >
          <div className="w-14  h-14 py- flex items-center justify-center">
            <img
              className="w-12 h-12 hover:w-14
                hover:h-14
                transition-all rounded-full shadow-xl"
              src={dummyProfile}
              alt="profile"
            />
          </div>
          <div className="flex flex-col grow gap-0  justify-end">
            <h6
              className={`font-semibold leading-7 ${
                selected ? "text-white" : ""
              } text-base`}
            >
             {
              otherUser[0].name
             }
            </h6>
            <p
              className={`font-normal text-sm ${selected ? "text-white" : ""}`}
            >
              {chat?.latestMessage?.content.length > 25
                      ? chat?.latestMessage?.content.substring(0, 26) + "..."
                      : chat?.latestMessage?.content}
            </p>
          </div>
         { chat.latestMessage && <div className="relative flex flex-col mt-2 items-center justify-end gap-1">
            <FaCircle
              size={20}
              className={`${selected ? "text-white" : "color"} justify-center`}
            />
            <p
              className={`font-normal text-sm ${selected ? "text-white" : ""}`}
            >
              {
                latestMessageTime 
              }
            </p>
            <div className="absolute top-[2px] right-[1.6rem]">
              <p
                className={`${
                  selected ? "text-black" : "text-white"
                } text-xs font-semibold `}
              >
                2
              </p>
            </div>
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
           latestMessageTime =new Date(chat?.latestMessage?.createdAt)
           .toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
          }
          return (
            <div key={chat._id}
            onClick={()=>{setSelectedGroup(chat)
              setSelectedChat(null)}}
            className={`flex items-center 
            ${
              selected ? "bg " : "bg-white hover:bg-gray-100"
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
                  selected ? "text-white" : ""
                } text-base`}
              >
                {chat.groupName}
              </h6>
              <p
                className={`font-normal text-sm ${selected ? "text-white" : ""}`}
              >
               {chat?.latestMessage?.content.length > 25
                      ? chat?.latestMessage?.content.substring(0, 26) + "..."
                      : chat?.latestMessage?.content}
              </p>
            </div>
          { chat.latestMessage && <div className="relative flex flex-col mt-2 items-center justify-end gap-1">
              <FaCircle
                size={20}
                className={`${selected ? "text-white" : "color"} justify-center`}
              />
              <p
                className={`font-normal text-sm ${selected ? "text-white" : ""}`}
              >
               {latestMessageTime}
              </p>
              <div className="absolute top-[2px] right-[1.6rem]">
                <p
                  className={`${
                    selected ? "text-black" : "text-white"
                  } text-xs font-semibold `}
                >
                  2
                </p>
              </div>
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
