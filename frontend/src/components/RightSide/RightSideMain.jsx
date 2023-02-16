import React from "react";
import PersonalChatRightSide from "./personal/PersonalChatRightSide";
import GroupChatRightSide from "./group/GroupChatRightSide";

const RightSideMain = ({selectedChat,selectedGroup}) => {  
  return (
    <div className="w-full h-[28pc] overflow-hidden overflow-y-scroll ">
   {
    selectedChat !== null && selectedGroup === null ? 
   <PersonalChatRightSide selectedChat={selectedChat}/>
  :
  <GroupChatRightSide selectedGroup={selectedGroup}/>
   }
  </div>
  );
};

export default RightSideMain;
