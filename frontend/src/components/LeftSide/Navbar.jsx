import React, { useContext } from "react";
import { RiChatNewFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DataContext } from "../../context/DataProvider";
import { MdGroupAdd } from "react-icons/md";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { setProfilePageOpen, setSearchPageOpen, setAddGroupMembersPageOpen } =
    useContext(DataContext);
   const {user} = useSelector(state => state.authReducer)
  return (
    <div className=" my-2">
      <div className="flex items-center justify-between w-full h-full gap-4">
        <div className="w-12  h-12 py-1 flex items-center justify-center">
          <img
            onClick={() => setProfilePageOpen(true)}
            className="w-10 cursor-pointer h-10 hover:w-11 hover:shadow-purple-200 hover:h-11 transition-all rounded-full shadow-xl"
            src={user.profile}
            alt="profile"
          />
        </div>
        <div className="flex ">
          <div
            onClick={() => setSearchPageOpen(true)}
            className="rounded-full cursor-pointer p-2 hover:bg-gray-100"
          >
            <RiChatNewFill className="color" size={27} />
          </div>
          <div  onClick={() => setAddGroupMembersPageOpen(true)}
          className="rounded-full  cursor-pointer p-2 hover:bg-gray-100">
            <MdGroupAdd  className="color" size={27} />
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default Navbar;
