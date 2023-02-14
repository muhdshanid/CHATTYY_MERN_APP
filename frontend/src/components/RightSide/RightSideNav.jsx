import React, { useContext } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { DataContext } from '../../context/DataProvider'

const RightSideNav = () => {
    const { setInfoPageOpen} = useContext(DataContext)

  return (
    <div className='bg h-[4.5rem]  flex gap-2 items-end'>
    <div className='flex gap-4 p-4 '>
    <IoCloseSharp 
    onClick={()=>setInfoPageOpen(false)}
         size={27}
         className="transition-all  cursor-pointer"
         color="white"
       />
       <h6 className='font-semibold text-lg text-white'>Contact info</h6>
    </div>
 </div>
  )
}

export default RightSideNav