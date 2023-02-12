import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { DataContext } from '../../context/DataProvider';
import { useCreateGroupMutation } from '../../store/services/chatServices';
import axios from 'axios'
import { ImSpinner9 } from 'react-icons/im';

const CreateGroup = () => {
    const {setCreateGroupPageOpen,selectedUsers
      ,setAddGroupMembersPageOpen,} = useContext(DataContext)
    const [groupName, setGroupName] = useState("")
    const [imageUploading, setImageUploading] = useState(false)
    const [isGroupNameAvail, setIsGroupNameAvail] = useState(true)
    const [isGroupDescAvail, setIsGroupDescAvail] = useState(true)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [createGroup,res] = useCreateGroupMutation()
    useEffect(()=>{
      if(res.isSuccess){
        setAddGroupMembersPageOpen(false)
        setCreateGroupPageOpen(false)
      }
    },[res.isSuccess, setAddGroupMembersPageOpen, setCreateGroupPageOpen])
    const dummyProfile = "data:image/jpeg;base64,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";
    const handleGroupCreate = () => {
      if(groupName === ""){ 
        setIsGroupNameAvail(false)
      }
      if(description === ""){
        setIsGroupDescAvail(false)
      }
      if(groupName !== "" && description !== "" && imageUploading === false){
        let groupMembers = JSON.stringify(selectedUsers)
        createGroup({groupName,description,groupMembers,groupProfile:image})
      }
    }
    const handleImageUpload = async(event) => {
        setImageUploading(true)
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      formData.append('upload_preset', 'mychatapp');
      await axios
        .post('https://api.cloudinary.com/v1_1/dlrujkhvx/image/upload', formData)
        .then((response) => {
          setImage(response.data.secure_url);
          setImageUploading(false)
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      
    };
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    const onChangeGroupName = e => {
      setGroupName(e.target.value)
      if(groupName !== ""){
        setIsGroupNameAvail(true)
      }
    }
    const onChangeGroupDesc = e => {
      setDescription(e.target.value)
      if(groupName !== ""){
        setIsGroupDescAvail(true)
      }
    }
  return (
    <div><div className='bg h-[4.5rem]  flex gap-2 items-end'>
    <div className='flex gap-4 p-4 '>
    <HiOutlineArrowLeft 
    onClick={()=>setCreateGroupPageOpen(false)}
         size={27}
         className="transition-all  cursor-pointer"
         color="white"
       />
       <h6 className='font-semibold text-lg text-white'>New group</h6>
    </div>
 </div>
 <div className="w-full h-[28pc]  ">
      <div className="flex flex-col gap-4 p-4">
        <div onClick={(e)=>handleClick(e)} className="flex relative items-center justify-center">
          <img
            className="w-[10rem]
             h-[10rem]  object-cover
                rounded-full shadow-xl"
            src={image !== "" ? image : dummyProfile}
            alt="profile"
          />
          <div className={`absolute  ${imageUploading ? "right-[10.4rem] top-10" : "right-[7rem] top-16"}`}>
           {imageUploading ?
           <>
           <ImSpinner9 size={40} className=" animate-spin"/>
           </>
            : image === "" ? <p className="font-semibold text-purple-900 text-lg">
              Add Group Profile
            </p> : ""}
          </div>
            
          <input 
                ref={hiddenFileInput}
                onChange={(e)=>handleImageUpload(e)} type="file" className='hidden' />
        </div>
        <div>
        <div className={`border ${isGroupNameAvail ? "border-purple-700" : "border-rose-500"} rounded-lg p-2`}>
       <input type="text" placeholder='Group Subject'
       value={groupName}
       onChange={(e)=>onChangeGroupName(e)}
        className='
        outline-none border-none w-full px-2 rounded-lg placeholder:text-gray-400' />
        </div>
       {  isGroupNameAvail === false &&
       <div>
        <p className='text-rose-500  capitalize'>group name required</p>
        </div>}
        </div>
     <div>
     <div className="border-purple-700 border  rounded-lg p-2">
       <textarea value={description}
       onChange={(e)=>onChangeGroupDesc(e)} 
        type="text" placeholder='Group Description' className='
        outline-none border-none w-full px-2 rounded-lg placeholder:text-gray-400' />
        </div>
        {  isGroupDescAvail === false &&
       <div>
                <p className='text-rose-500  capitalize'>group description required</p>
        </div>}
     </div>
        <div className='h-20 bg-white w-full flex items-center justify-center '>
        <div className=''>
          {res?.isLoading ?
                     <ImSpinner9 size={40} className=" animate-spin"/> 
          : 
            <IoMdCheckmarkCircle onClick={handleGroupCreate}
           size={40} className="cursor-pointer color"/>}
        </div>
      </div>
      </div>
    </div>
 </div>
  )
}

export default CreateGroup