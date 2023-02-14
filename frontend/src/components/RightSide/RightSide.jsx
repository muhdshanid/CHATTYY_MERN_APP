import React, { useContext } from 'react'
import RightSideNav from './RightSideNav'
import RightSideMain from './RightSideMain'
import { DataContext } from '../../context/DataProvider'
import MediaPageNav from './MediaPageNav'
import MediaMainPage from './MediaMainPage'
 
const RightSide = () => {
  const {selectedChat,selectedGroup,mediaPageOpen} = useContext(DataContext)
  return (
    <div className='w-[100%]'>
    {
      mediaPageOpen ? 
      <>
      <MediaPageNav/>
      <MediaMainPage selectedGroup={selectedGroup} selectedChat={selectedChat}  />
      </>
      :
      <>
      <RightSideNav/>
    <RightSideMain selectedChat={selectedChat} selectedGroup={selectedGroup}/>
      </>
    }
  </div>
  )
}

export default RightSide