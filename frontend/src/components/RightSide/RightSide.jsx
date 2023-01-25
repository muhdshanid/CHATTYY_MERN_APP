import React, { useContext } from 'react'
import RightSideNav from './RightSideNav'
import RightSideMain from './RightSideMain'
import { DataContext } from '../../context/DataProvider'

const RightSide = () => {
  const {selectedChat,selectedGroup} = useContext(DataContext)
  return (
    <div className='w-[100%]'>
    <RightSideNav/>
    <RightSideMain selectedChat={selectedChat} selectedGroup={selectedGroup}/>
  </div>
  )
}

export default RightSide