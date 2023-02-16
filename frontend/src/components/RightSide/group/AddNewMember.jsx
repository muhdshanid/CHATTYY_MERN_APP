import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { DataContext } from '../../../context/DataProvider'
import { IoClose, IoSearchCircleSharp } from 'react-icons/io5';
import { ImSpinner9 } from 'react-icons/im';
import { FaUserTimes } from 'react-icons/fa';
import { useAddMembersMutation, useGetUsersToAddQuery } from '../../../store/services/chatServices';
import { IoMdCheckmarkCircle } from 'react-icons/io';
const AddNewMember = () => {
    const {setAddMemberPage,
      selectedUsers, selectedGroup,
      setSelectedUsers,setSelectedGroup} = useContext(DataContext)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [addMembers,res] = useAddMembersMutation()
    const { data, isLoading ,refetch,isFetching} = useGetUsersToAddQuery({search,groupId:selectedGroup?._id});
    console.log(data);
    useEffect(()=>{
      if( isFetching === false){
        setSearchResults(data)
      }
    },[data, isFetching, search])
    const onChange = e => {
      setSearch(e.target.value)
      if(search !== ""){
        refetch()
      }
    }
    useEffect(()=>{
        if(res.isSuccess){
          setSelectedGroup(res.data)
          setAddMemberPage(false)
        }
      },[res.data, res.isSuccess, setAddMemberPage, setSelectedGroup])
    const addGroupMembers = () => {
        const membersToAdd = selectedUsers.map(usr => usr._id)
        addMembers({users:membersToAdd,groupId:selectedGroup?._id})
    }
    const handleUserAdd = user => {
      let isExist = selectedUsers.find(usr => user === usr)
      if(!isExist){
        setSelectedUsers([...selectedUsers,user])
      }
    }
    const handleUserRemove = user => {
      let filtered = selectedUsers.filter(usr => usr !== user)
      setSelectedUsers(filtered)
    }
  return (
    <div className='relative '>
    <div className='bg h-[4.5rem]  flex gap-2 items-end'>
       <div className='flex gap-4 p-4 '>
       <HiOutlineArrowLeft 
       onClick={()=>setAddMemberPage(false)}
            size={27}
            className="transition-all  cursor-pointer"
            color="white"
          />
          <h6 className='font-semibold text-lg text-white'>Add group members</h6>
       </div>
    </div>
    <div className="flex  flex-col gap-2">
      <div className="p-2  mt-2 items-center gap-2 shadow-xl bg-white rounded-lg flex">
      <div>
            <button
              className="px-2 py-1  rounded-full  text-white"
            >
              <IoSearchCircleSharp size={30} className="bg rounded-full" color="white"/>
            </button>
          </div>
        <input
         value={search}
         onChange={(e) => onChange(e)}
          type="text"
          placeholder="Find a user..."
          className=" w-full px-1
           placeholder:text-purple-300 
           border-none rounded-lg outline-none"
        />
      </div>
      <div className='flex  items-center '>
      { 
        selectedUsers?.length > 0 ?
           <div className='flex p-2 rounded-lg
           items-center'>
        {
          selectedUsers?.map((user,i) => (
              <div key={i} className='flex mx-2 rounded-lg bg px-2 py-1 items-center'>
              <h6 className='font-semibold text-md text-white'>{user.name}</h6>
              <IoClose onClick={()=>handleUserRemove(user)} size={24} color="white" className="text-white cursor-pointer"/>
              </div>
          ))
        }
        </div>
        :""
      } 
      </div>
      <div className="flex flex-col gap-2 overflow-hidden overflow-y-scroll h-[25.5pc]">
      {
          isLoading  || isFetching ? <div className="w-full h-[70%]
          flex justify-center flex-col gap-2 items-center">
          <ImSpinner9 size={40} className=" animate-spin"/>
         </div> : 
          searchResults?.length > 0 ?
          searchResults?.map((usr,i) => (
            <div key={i} onClick={()=>handleUserAdd(usr)} className="flex items-center  hover:bg-gray-100 cursor-pointer gap-1 h-[4.5rem]  px-2 shadow-xl bg-white rounded-xl">
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
      <div className={`h-20
       bg-white w-full flex items-center justify-center absolute
        ${selectedUsers?.length > 0 ? "-bottom-[-64px]" : "-bottom-[-24px]"}`}>
        {res?.isLoading ?
                     <ImSpinner9 size={40} className=" animate-spin"/> 
          : 
            <IoMdCheckmarkCircle onClick={addGroupMembers}
           size={40} className="cursor-pointer color"/>}
      </div>
    </div>
  )
}

export default AddNewMember