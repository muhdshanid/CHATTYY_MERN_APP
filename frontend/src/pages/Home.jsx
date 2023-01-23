import React from 'react'
import CenterMain from '../components/CenterArea/CenterMain'
import LeftSideMain from '../components/LeftSide/LeftSideMain'
import RightSideMain from '../components/RightSide/RightSideMain'

const Home = () => {
  return (
    <div className='w-screen flex items-center justify-center h-screen bg-purple-700'>
        <div className='w-[90%] flex   bg-white h-[95%] rounded-lg '>
        <LeftSideMain/>
        <CenterMain/>
        <RightSideMain/>
        </div>
    </div>
  )
}

export default Home