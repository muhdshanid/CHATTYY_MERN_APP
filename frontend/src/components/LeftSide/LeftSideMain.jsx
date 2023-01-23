import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'

const LeftSideMain = () => {
  return (
    <div className='w-[30%] px-8 border-r-purple-700'>
        <Navbar/>
        <Chats/>
    </div>
  )
}

export default LeftSideMain