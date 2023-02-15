import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { DataContext } from "../../context/DataProvider";
import { useSearchUsersQuery } from "../../store/services/userServices";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { FaUserTimes } from "react-icons/fa";
import { useCreateChatMutation } from "../../store/services/chatServices";
const Search = () => {
  const {  setSearchPageOpen } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, isLoading ,isFetching,refetch} = useSearchUsersQuery(search);
  const [createPersonalChat,res] = useCreateChatMutation()
  const onChange = e => {
    setSearch(e.target.value)
    if(search !== ""){
      refetch()
    }
  }
  useEffect(()=>{
    if(res.isSuccess){
      setSearchPageOpen(false)
    }
  },[res.isSuccess, setSearchPageOpen])
  const createChat = id => {
    createPersonalChat({receiverId:id})
  }
  useEffect(()=>{
    if( isFetching === false){
      setSearchResults(data)
    }
  },[data, isFetching, search])
  return (
    <>
      <div className="bg h-[4.5rem]  flex gap-2 items-end">
        <div className="flex gap-4 p-4 ">
          <HiOutlineArrowLeft
            onClick={() => setSearchPageOpen(false)}
            size={27}
            className="transition-all  cursor-pointer"
            color="white"
          />
          <h6 className="font-semibold text-lg text-white">New chat</h6>
        </div>
      </div>
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
            onChange={(e) =>onChange(e)}
            type="text"
            placeholder="Find an angel..."
            className=" w-full px-1 placeholder:text-purple-300 border-none rounded-full outline-none"
          />
         
        </div>
        <div className="flex flex-col gap-2 overflow-hidden overflow-y-scroll h-[25.5pc]">
         {
          isLoading || isFetching ? <div className="w-full h-[70%]
          flex justify-center flex-col gap-2 items-center">
          <ImSpinner9 size={40} className=" animate-spin"/>
         </div> : 
        searchResults?.length > 0 ? 
        searchResults?.map(usr => (
          <div onClick={()=>createChat(usr._id)} className="flex items-center  hover:bg-gray-100 cursor-pointer gap-1 h-[4.5rem]  px-2 shadow-xl bg-white rounded-xl">
          <div className="w-14  h-14 py- flex items-center justify-center">
            <img
              className="w-12 h-12 hover:w-14
              hover:h-14
              transition-all rounded-full shadow-xl"
              src={usr.profile}
              alt="profile"
            />
          </div>
          <div className="flex flex-col grow gap-0  justify-end">
            <h6 className="font-semibold leading-7 text-base">{usr.name}</h6>
            <p className="font-normal text-sm ">{usr.email}</p>
          </div>
        </div>
        ))
        : 
        <div className="w-full h-[70%]
          flex justify-center flex-col gap-2 items-center">
          <FaUserTimes size={40} className=" animate-pulse"/>
          <p className=" font-semibold text-lg capitalize text-rose-500">No User found</p>
         </div>
         }
        </div>
      </div>
    </>
  );
};

export default Search;
