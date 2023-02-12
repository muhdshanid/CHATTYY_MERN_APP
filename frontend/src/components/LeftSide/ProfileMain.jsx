import axios from "axios";
import React, { useRef, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useUserUpdateMutation } from "../../store/services/userServices";
import { useEffect } from "react";
import { setUser } from "../../store/reducers/authReducer";
const ProfileMain = () => {
    const {user} = useSelector(state => state.authReducer)
    const [image, setImage] = useState("")
    const [imageUploading, setImageUploading] = useState(false)
    const [name, setName] = useState(user?.name)
    const [isAboutEdit, setIsAboutEdit] = useState(false)
    const [about, setAbout] = useState(user?.about)
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const [update,res] = useUserUpdateMutation()
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
      })
      .catch((error) => {
        console.error(error);
      });
    
  };
  useEffect(()=>{
    if(image !== ""){
      update({profile:image})
    }
  },[image, update])
  useEffect(()=>{
    if(res.isSuccess){
      const dataFromLocalStorage = localStorage.getItem("userData")
      let { user,token } = JSON.parse(dataFromLocalStorage);
      user = res?.data?.user;
      localStorage.setItem("userData", JSON.stringify({user,token }));
      dispatch(setUser(res?.data?.user))
      setIsEdit(false)
      setIsAboutEdit(false)
    }
  },[dispatch, res?.data, res.isSuccess])
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const updateName = () => {
    if(name !== ""){
      update({name})
    }
  }
  const updateAbout = () => {
    if(about !== ""){
      update({about})
    }
  }
  return (
    <div className="w-full h-[28pc] overflow-hidden overflow-y-scroll ">
      <div className="flex flex-col gap-4 p-4">
      <div onClick={(e)=>handleClick(e)} className="flex relative items-center justify-center">
          <img
            className="w-[10rem]
             h-[10rem]  object-cover
                rounded-full shadow-xl"
            src={user?.profile}
            alt="profile"
          />
          <div className={`absolute  ${imageUploading ? "right-[10rem] top-14" : "right-[6.5rem] top-16"}`}>
           {imageUploading ?
           <>
           <ImSpinner9 size={40} color="white" className=" animate-spin"/>
           </>
            :  ""}
          </div>
            
          <input 
                ref={hiddenFileInput}
                onChange={(e)=>handleImageUpload(e)} type="file" className='hidden' />
        </div>
        <div className="bg-gray-100 rounded-lg">
          <div className="flex p-2 flex-col gap-2">
            <h6 className="text-black font-semibold">Your name</h6>
            <div className="flex items-center rounded-lg bg-white py-1 px-2 justify-between">
            {
              isEdit ?
              <>
              <input type="text" onChange={(e)=>setName(e.target.value)} 
              value={name}
              className='
              outline-none border-none w-full  rounded-lg '/>
              <IoMdClose onClick={()=>{
                setIsEdit(false)
                setName(user.name)
              }} size={30} className="color cursor-pointer" />
              {
                res?.isLoading ? 
                <>
           <ImSpinner9 size={27} className=" animate-spin"/>
           </>
                :
                <IoMdCheckmark onClick={()=>updateName()} size={30} className="color cursor-pointer" />

              }
              </>
              :
              <>
              <h6 className="text-black font-normal py-[3px]">{user.name}</h6>
            <MdModeEditOutline onClick={()=>setIsEdit(true)} size={25} className="color cursor-pointer" />
              </>
            }
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg">
          <div className="flex px-2 py-2 flex-col gap-2">
            <div className="flex items-center justify-between">
            <h6 className="text-black font-semibold">About</h6>
            <div className="flex gap-1 items-center">
            {
              isAboutEdit ?
              <>
              <IoMdClose onClick={()=>{
                setIsAboutEdit(false)
                setAbout(user.about)
              }} size={25} className="color cursor-pointer" />
              {
                res?.isLoading ? 
           <ImSpinner9 size={27} className=" animate-spin"/>
                :
                <IoMdCheckmark onClick={()=>updateAbout()} size={25} className="color cursor-pointer" />
              }
              </> 
              :
              <MdModeEditOutline onClick={()=>setIsAboutEdit(true)} size={25} className="color 
               cursor-pointer content-end" />
            }
            </div>
            </div>
             {
              isAboutEdit ? 
              <textarea className=" py-2 px-2 outline-none rounded-lg" onChange={(e)=>setAbout(e.target.value)} value={about} ></textarea>
              :
             <div className=" px-2 py-2 bg-white rounded-lg">
               <p className="text-black  break-words font-normal">
              {user.about ? user.about : ""}
             </p>
             </div>
             }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
