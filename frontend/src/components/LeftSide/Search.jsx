import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { DataContext } from "../../context/DataProvider";
import { useSearchUsersQuery } from "../../store/services/userServices";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { FaUserTimes } from "react-icons/fa";
import { useCreateChatMutation } from "../../store/services/chatServices";
const Search = () => {
  const dummyProfile =
    "data:image/jpeg;base64,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";

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
              src={dummyProfile}
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
