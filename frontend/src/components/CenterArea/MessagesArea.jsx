import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import { useFetchGroupMessagesQuery, useFetchPersonalMessagesQuery } from "../../store/services/messageService";
import Message from "./Message";

const MessagesArea = ({ socket,selectedChat,selectedGroup }) => {
  const { data, isFetching } = useFetchPersonalMessagesQuery(selectedChat?._id);
  const { data:result, isFetching:gettingData } = useFetchGroupMessagesQuery(selectedGroup?._id);
  const { messages, setMessages ,groupMessages,
    setGroupMessages} = useContext(DataContext);
    const [arrivalMessage, setArrivalMessage] = useState(null)
  useEffect(() => {
    if (isFetching === false) {
      setMessages(data);
    }
  }, [isFetching,selectedChat]);
  useEffect(()=>{
    if(gettingData === false){
      setGroupMessages(result)
    }
  },[gettingData,selectedGroup])
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
        console.log(msg,"socketmasg");
        setArrivalMessage({message:{type:msg.type,message:msg.message}})
      })
    }
  },[arrivalMessage,messages])
  useEffect(()=>{
    arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
  },[arrivalMessage])
  return (
    <>
    <div  className="w-full  grow pt-2 overflow-hidden overflow-y-scroll">
     {
      selectedChat !== null && selectedGroup === null ? 
      <div  className="p-2 flex flex-col gap-4  justify-center">
      {isFetching ? "" : messages?.map((msg) => <Message  key={msg._id} message={msg} />)}
    </div> : 
     <div  className="p-2 flex flex-col gap-4  justify-center">
     {gettingData ? "" : groupMessages?.map((msg) => <Message  key={msg._id} message={msg} />)}
   </div>
     }
    </div>
    </>
  );
};

export default MessagesArea;
