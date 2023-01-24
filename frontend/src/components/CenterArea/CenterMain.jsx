import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import CenterNav from './CenterNav'
import MessageInput from './MessageInput'
import MessagesArea from './MessagesArea'
import { useTransition,animated } from "react-spring";
import RightSide from '../RightSide/RightSide'
const CenterMain = () => {
  const { infoPageOpen,setInfoPageOpen} = useContext(DataContext)
  const transition = useTransition(infoPageOpen,{
    from:{x:100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:100 ,y:0 ,opacity:0},
   })
  return (
  <>
    <div className={`${infoPageOpen ? "w-full" : " w-full"}  flex `}>
      <div className={`${infoPageOpen ? "w-[90%]" : 'w-full'} transition-all flex flex-col justify-between`}>
      <CenterNav/>
      <MessagesArea/>
      <MessageInput/>
      </div>
    {
        transition((style,item)=>
          item ? <animated.div style={style}  className={`transition-all 
          z-10 bg-white 
           `}>
            <RightSide/>
          </animated.div>  : ""
        )
      }
       </div>
    </>
  )
}

export default CenterMain