import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { TiDocumentAdd } from "react-icons/ti";
import { IoSend } from "react-icons/io5";
import { DataContext } from "../../../context/DataProvider";
import {
  useCreateNewGroupMessageMutation,
  useFetchGroupMessagesQuery,
} from "../../../store/services/messageService";
import axios from "axios";
import { useTransition,animated } from "react-spring";
import { AiOutlineLink, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { FaSmile } from "react-icons/fa";
const GroupMessageInput = () => {
  const { groupMessages, setGroupMessages, selectedGroup } =
    useContext(DataContext);
  const [groupMessage, setGroupMessage] = useState("");
  const [isGroupOptionsPopup, setIsGroupOptionsPopup] = useState(false);
  const [isGroupVideoUploaded, setisGroupVideoUploaded] = useState(false);
  const [groupImageCaption, setGroupImageCaption] = useState("");
  const [groupVideoCaption, setGroupVideoCaption] = useState("");
  const [groupVideoUrl, setGroupVideoUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [groupImage, setGroupImage] = useState("");
  const [isGroupImageUploaded, setIsGroupImageUploaded] = useState(false);
  const hiddenGroupFileInput = useRef(null);
  const hiddenGroupVideoFileInput = useRef(null);
  const [sendGroupMessage, response] = useCreateNewGroupMessageMutation();
  const transition = useTransition(isGroupOptionsPopup,{
    from:{x:0 ,y:100 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:0 ,y:100 ,opacity:0},
   })
  const {
    data: result,
    isFetching: gettingData,
    refetch,
  } = useFetchGroupMessagesQuery(selectedGroup?._id);
  const handleGroupImageSend = () => {
    sendGroupMessage({
      message: { type: "img", message: groupImage, caption: groupImageCaption },
      groupChatId: selectedGroup._id,
    });
  };
  const handleGroupImageUpload = async (event) => {
    setImageUploading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mychatapp");
    await axios
      .post("https://api.cloudinary.com/v1_1/dlrujkhvx/image/upload", formData)
      .then((response) => {
        setGroupImage(response.data.secure_url);
        setImageUploading(false);
        setIsGroupImageUploaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGroupVideoSend = () => {
    sendGroupMessage({
      message: {
        type: "video",
        message: groupVideoUrl,
        caption: groupVideoCaption,
      },
      groupChatId: selectedGroup._id,
    });
  };
  const handleGroupMessageSend = () => {
    if (groupMessage !== "") {
      sendGroupMessage({
        message: { type: "text", message: groupMessage },
        groupChatId: selectedGroup._id,
      });
      setGroupMessage("");
      setGroupMessages([...groupMessages, groupMessage]);
    }
  };
  const handleVideoGroupClick = (event) => {
    hiddenGroupVideoFileInput.current.click();
  };
  const handleGroupInputClick = (event) => {
    hiddenGroupFileInput.current.click();
  };
  const handleGroupVideoUpload = (event) => {
    event.preventDefault();
    setVideoUploading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mychatapp");
    formData.append("cloud_name", "dlrujkhvx");
    fetch("https://api.cloudinary.com/v1_1/dlrujkhvx/video/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setGroupVideoUrl(data.secure_url);
        setisGroupVideoUploaded(true);
        setVideoUploading(false);
      });
  };
  useEffect(() => {
    if (response.isSuccess) {
      refetch();
      setIsGroupImageUploaded(false);
      setGroupImageCaption("");
      setisGroupVideoUploaded(false);
      setGroupVideoCaption("");
    }
  }, [refetch, response.isSuccess]);
  return (
    <>
      <div className="flex items-center ">
        <FaSmile className="color" size={25} />
      </div>
      <input
        className="grow px-4 py-2 outline-none rounded-full border -none"
        value={groupMessage}
        placeholder="Type a message"
        onChange={(e) => setGroupMessage(e.target.value)}
        type="text"
      />
      <div className="flex  items-center">
        <div className="rounded-full cursor-pointer p-2 hover:bg-gray-100">
          <AiOutlineLink
            className="text-gray-500"
            size={25}
            onClick={() => setIsGroupOptionsPopup((prev) => !prev)}
          />
          {isGroupImageUploaded && (
            <div className="absolute bg  px-2 py-2 rounded-lg right-2 bottom-2 z-50 ">
              <div className="relative">
                <div className="absolute right-1 top-1">
                  <IoMdClose
                    onClick={() => setIsGroupImageUploaded(false)}
                    color="white"
                    size={25}
                  />
                </div>
                <img
                  src={groupImage}
                  alt="img"
                  className="w-[300px] rounded-lg"
                />
              </div>
              <div className="flex mt-2 gap-4 justify-between items-center">
                <input
                  onChange={(e) => setGroupImageCaption(e.target.value)}
                  value={groupImageCaption}
                  type="text"
                  placeholder="Add Caption..."
                  className="rounded-full grow outline-none border-none px-2 py-2"
                />
                {response?.isLoading ? (
                  <ImSpinner9
                    size={27}
                    color="white"
                    className=" animate-spin"
                  />
                ) : (
                  <IoSend
                    onClick={handleGroupImageSend}
                    size={25}
                    className="text-white "
                  />
                )}
              </div>
            </div>
          )}
          {isGroupVideoUploaded && (
            <div className="absolute bg  px-2 py-2 rounded-lg right-4 bottom-4 z-50 ">
              <div className="relative">
                <div className="absolute right-1 top-1">
                  <IoMdClose
                    onClick={() => setisGroupVideoUploaded(false)}
                    color="white"
                    size={25}
                  />
                </div>
                <video controls alt="video" className="w-[250px] rounded-lg">
                  <source type="video/mp4" src={groupVideoUrl} />
                </video>
              </div>
              <div className="flex mt-2 gap-4 justify-between items-center">
                <input
                  onChange={(e) => setGroupVideoCaption(e.target.value)}
                  value={groupVideoCaption}
                  type="text"
                  placeholder="Add Caption..."
                  className="rounded-full grow outline-none border-none px-2 py-2"
                />
                {response?.isLoading ? (
                  <ImSpinner9
                    size={27}
                    color="white"
                    className=" animate-spin"
                  />
                ) : (
                  <IoSend
                    onClick={handleGroupVideoSend}
                    size={25}
                    className="text-white "
                  />
                )}
              </div>
            </div>
          )}
          {
          transition((style,item)=>
            item ? <animated.div style={style}  className={`absolute transition-all rounded-full bg p-2 bottom-16 right-12
           
             `}>
               <div className="">
              <div className="flex rounded-full bg-white p-2  items-center gap-6 flex-col">
                <BiImageAdd
                  onClick={(e) => handleGroupInputClick(e)}
                  size={25}
                  className="text-gray-500"
                />
                <input
                  ref={hiddenGroupFileInput}
                  onChange={handleGroupImageUpload}
                  accept="image/*"
                  type="file"
                  className="hidden"
                />
                <AiOutlineVideoCameraAdd
                  onClick={(e) => handleVideoGroupClick(e)}
                  className="text-gray-500"
                  size={25}
                />
                <input
                  ref={hiddenGroupVideoFileInput}
                  onChange={handleGroupVideoUpload}
                  accept="video/*"
                  type="file"
                  className="hidden"
                />
                <TiDocumentAdd className="text-gray-500" size={25} />
              </div>
            </div>
            </animated.div>  : ""
          )
        } 
           
      
        </div>
      </div>
      <div className="cursor-pointer  flex items-center justify-center  p-1">
        {imageUploading || videoUploading || response?.isLoading ? (
          <ImSpinner9 size={27} color="black" className=" animate-spin" />
        ) : (
          <IoSend
            onClick={handleGroupMessageSend}
            size={25}
            className="color"
          />
        )}
      </div>
    </>
  );
};

export default GroupMessageInput;
