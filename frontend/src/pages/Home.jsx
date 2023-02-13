import React from 'react'
import CenterMain from '../components/CenterArea/CenterMain'
import LeftSideMain from '../components/LeftSide/LeftSideMain'

const Home = () => {
  return (
    <div className='w-screen flex items-center justify-center h-screen bg'>
        <div className='w-[95%] overflow-hidden flex border  bg-white h-[95%] rounded-lg '>
       <LeftSideMain/>
        <CenterMain/>
        </div>
    </div>
  )
}

export default Home