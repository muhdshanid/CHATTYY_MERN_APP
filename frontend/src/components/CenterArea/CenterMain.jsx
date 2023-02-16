import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import RightSide from '../RightSide/RightSide'
import CenterNav from './CenterNav'
import MessageInput from './input/MessageInput'
import MessagesArea from './MessagesArea'
import { useTransition,animated } from "react-spring";
import { useSelector } from 'react-redux'
import { useSocket } from '../../context/SocketProvider'
import { AiFillWechat } from 'react-icons/ai'
const CenterMain = () => {
  const {user} = useSelector(state => state.authReducer)
  const {socket} = useSocket()
  const { infoPageOpen,selectedChat,selectedGroup,} = useContext(DataContext)
  const transition = useTransition(infoPageOpen,{
    from:{x:100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:100 ,y:0 ,opacity:0},
   })
   useEffect(() => {
    if(socket){
      socket.emit("newUser",user?.name)
    }
  }, [user.name]);
  return (
  <>
    <div  className={`${infoPageOpen ? "w-full" : " w-full"} flex `}>
      { selectedChat === null && selectedGroup === null ?
      <div className='w-full flex-col gap-4 flex items-center justify-center h-full'>
        <AiFillWechat className='color' size={100}/>
        <h1 className='text-3xl font-semibold  capitalize'>Click on a contact to start chat</h1>
      </div>
      :
        selectedChat !== null  ?<> <div className={`${infoPageOpen ? "w-[90%]" : 'w-full'} transition-all flex flex-col justify-between`}>
        <CenterNav selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessagesArea   selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessageInput  selectedGroup={selectedGroup} selectedChat={selectedChat}/>

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
        <MessagesArea  selectedGroup={selectedGroup} selectedChat={selectedChat}/>
        <MessageInput  selectedGroup={selectedGroup} selectedChat={selectedChat}/>
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