import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import Chats from './Chats'
import Navbar from './Navbar'
import { useTransition,animated } from "react-spring";
import Profile from './Profile'
import Search from './Search'
import AddGroupMembers from './AddGroupMembers'
const LeftSideMain = () => {
  const {profilePageOpen,searchPageOpen,addGroupMembersPageOpen} = useContext(DataContext)
  const transition = useTransition(profilePageOpen,{
    from:{x:-100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:-100 ,y:0 ,opacity:0},
   })
  const transitionTwo = useTransition(searchPageOpen,{
    from:{x:-100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:-100 ,y:0 ,opacity:0},
   })
  const transitionThree = useTransition(addGroupMembersPageOpen,{
    from:{x:-100 ,y:0 ,opacity:0},
    enter:{x:0 ,y:0 ,opacity:1},
    leave:{x:-100 ,y:0 ,opacity:0},
   })
  return (
    <div className={`w-[50%]   relative  border-r-black`}>
        <div className='w-full pl-4'>
        <Navbar/>
        <Chats/>
        </div>

        {
        transition((style,item)=>
          item ? <animated.div style={style}  className={`transition-all 
          z-10 bg-white 
          absolute inset-0`}>
            <Profile/>
          </animated.div>  : ""
        )
      }
        {
        transitionTwo((style,item)=>
          item ? <animated.div style={style}  className={`transition-all 
          z-10 bg-white 
          absolute inset-0`}>
            <Search/>
          </animated.div>  : ""
        )
      }
        {
        transitionThree((style,item)=>
          item ? <animated.div style={style}  className={`transition-all 
          z-10 bg-white 
          absolute inset-0`}>
            <AddGroupMembers/>
          </animated.div>  : ""
        )
      }
    </div>
  )
}

export default LeftSideMain