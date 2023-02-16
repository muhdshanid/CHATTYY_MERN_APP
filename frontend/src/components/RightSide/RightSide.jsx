import React, { useContext } from 'react'
import RightSideNav from './RightSideNav'
import RightSideMain from './RightSideMain'
import { DataContext } from '../../context/DataProvider'
import MediaPageNav from './media/MediaPageNav'
import MediaMainPage from './media/MediaMainPage'
import AddNewMember from './group/AddNewMember'
 
const RightSide = () => {
  const {selectedChat,selectedGroup,addMemberPage,mediaPageOpen} = useContext(DataContext)
  return (
    <div className='w-[100%]'>
    {
      mediaPageOpen ? 
      <>
      <MediaPageNav/>
      <MediaMainPage selectedGroup={selectedGroup} selectedChat={selectedChat}  />
      </>
      :
      addMemberPage ? 
      <AddNewMember/>
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