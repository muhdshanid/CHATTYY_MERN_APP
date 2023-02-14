import React, { useContext } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { DataContext } from '../../context/DataProvider'

const MediaPageNav = () => {
    const {setMediaPageOpen } = useContext(DataContext)

    return (
      <div className='bg h-[4.5rem]  flex gap-2 items-end'>
      <div className='flex gap-4 p-4 '>
      <HiOutlineArrowLeft 
      onClick={()=>setMediaPageOpen(false)}
           size={27}
           className="transition-all  cursor-pointer"
           color="white"
         />
         <h6 className='font-semibold text-lg text-white'>Media Messages</h6>
      </div>
   </div>
    )
}

export default MediaPageNav