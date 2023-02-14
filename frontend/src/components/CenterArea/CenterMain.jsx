import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import {io} from 'socket.io-client'

import CenterNav from './CenterNav'
import MessageInput from './MessageInput'
import MessagesArea from './MessagesArea'
import { useTransition,animated } from "react-spring";
import RightSide from '../RightSide/RightSide'
import { useSelector } from 'react-redux'
const CenterMain = () => {
  const {user} = useSelector(state => state.authReducer)
  
  const { infoPageOpen,selectedChat,selectedGroup,} = useContext(DataContext)
  const transition = useTransition(infoPageOpen,{
    from:{x:100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:100 ,y:0 ,opacity:0},
   })
   const socket = useRef()
   useEffect(() => {
    socket.current = io('http://localhost:5000');
      socket.current.emit("newUser",user?.name)
  }, [user.name]);
  return (
  <>
    <div  className={`${infoPageOpen ? "w-full" : " w-full"} flex `}>
      {
        selectedChat !== null  ?<> <div className={`${infoPageOpen ? "w-[90%]" : 'w-full'} transition-all flex flex-col justify-between`}>
        <CenterNav selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessagesArea  socket={socket}  selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessageInput  socket={socket} selectedGroup={selectedGroup} selectedChat={selectedChat}/>

        </div>
      {
          transition((style,item)=>
            item ? <animated.div style={style}  className={`transition-all 
            z-10 bg-white w-[70%]
             `}>
              <RightSide/>
            </animated.div>  : ""
          )
        } 
        </> : 
        <> <div className={`${infoPageOpen ? "w-[90%]" : 'w-full'} transition-all flex flex-col justify-between`}>
        <CenterNav selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessagesArea socket={socket} selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessageInput socket={socket} selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        </div>
      {
          transition((style,item)=>
            item ? <animated.div style={style}  className={`transition-all 
            z-10 bg-white w-[70%]
             `}>
              <RightSide/>
            </animated.div>  : ""
          )
        } 
        </>
      }
       </div>
    </>
  )
}

export default CenterMain