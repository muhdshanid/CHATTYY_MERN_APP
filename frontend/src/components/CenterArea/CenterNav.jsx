import React, {useContext } from "react";
import { BiExit } from "react-icons/bi";
import { IoMdCall, IoMdMore, IoMdVideocam } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useSocket } from "../../context/SocketProvider";

const CenterNav = ({ selectedChat, selectedGroup }) => {
  const { socket } = useSocket();
  console.log(socket);
  const navigate = useNavigate();
  const { setInfoPageOpen } = useContext(DataContext);
  const { user } = useSelector((state) => state.authReducer);
  let otherUser = selectedChat?.users?.filter((usr) => usr._id !== user._id);
  const createVideoCall = () => {
    navigate(`/room/${selectedChat?._id}`);
  };
  return (
    <div className="w-full h-16 rounded-lg px-2  shadow-sm">
      {selectedChat !== null && selectedGroup === null ? (
        <div className="my-2  gap-4 flex items-center ">
          <div onClick={() => setInfoPageOpen(true)} className="cursor-pointer">
            <img
              className="w-12
         h-12
            rounded-full shadow-sm"
              src={otherUser[0].profile}
              alt="profile"
            />
          </div>
          <div
            onClick={() => setInfoPageOpen(true)}
            className="flex flex-col cursor-pointer  justify-center grow"
          >
            <h6 className="text-lg font-semibold text-black">
              {otherUser[0].name ? otherUser[0].name : ""}
            </h6>
            <p className="font-normal text-sm ">Online</p>
          </div>
          <div className="flex  pr-4">
            <div className="rounded-full p-2 hover:bg-gray-100">
              <IoMdCall size={27} className="color" />
            </div>
            <div className="rounded-full p-2 hover:bg-gray-100">
              <IoMdVideocam
                onClick={createVideoCall}
                size={27}
                className="color cursor-pointer"
              />
            </div>
            <div className="rounded-full p-2 hover:bg-gray-100">
              <IoMdMore size={27} className="color" />
            </div>
          </div>
        </div>
      ) : (
        <div className="my-2  gap-4 flex items-center ">
          <div onClick={() => setInfoPageOpen(true)} className="cursor-pointer">
            <img
              className="w-12
      h-12
         rounded-full shadow-sm"
              src={selectedGroup?.groupProfile}
              alt="profile"
            />
          </div>
          <div
            onClick={() => setInfoPageOpen(true)}
            className="flex flex-col cursor-pointer  justify-center grow"
          >
            <h6 className="text-lg font-semibold text-black">
              {selectedGroup?.groupName}
            </h6>
            <p className="font-normal text-sm ">
              {selectedGroup?.groupMembers?.length} Members
            </p>
          </div>
          <div className="flex  pr-4">
            <div className="rounded-full p-2 hover:bg-gray-100">
              <IoMdMore  size={27} className="color" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterNav;
