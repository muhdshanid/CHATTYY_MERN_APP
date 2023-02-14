import React, { useContext } from 'react'
import { DataContext } from '../../context/DataProvider';

const MediaMainPage = ({selectedChat,selectedGroup}) => {
    const { messages ,groupMessages,} = useContext(DataContext);
    const mediaMessages = messages?.filter(msg => msg.message.type !== "text")
    const groupMediaMessages = groupMessages?.filter(msg => msg.message.type !== "text")
  return (
    <div className="w-full h-[28pc] overflow-hidden overflow-y-scroll ">
        {
    selectedChat !== null && selectedGroup === null ? 
    <div className='pl-3 py-4 grid  grid-cols-3'>
        {
          mediaMessages?.map(msg => (
            msg.message.type === "img" ? 
            <div className='mb-4'>
            <img src={msg.message.message} alt="media" className="rounded-lg w-[6rem] h-20 object-cover" />
          </div>
          : 
          <div>
          <video src={msg.message.message} alt="media" className="rounded-lg w-[6rem] h-20 object-cover" />
        </div>
          ))
        }
    </div>
    : 
    <div className='pl-3 py-4  grid grid-cols-3 '>
        {
          groupMediaMessages?.map(msg => (
            msg.message.type === "img" ? 
            <div className=''>
            <img src={msg.message.message} alt="media" className="rounded-lg w-[6rem] h-20 object-cover" />
          </div>
          : 
          <div>
          <video src={msg.message.message} alt="media" className="rounded-lg w-[6rem] h-20 object-cover" />
        </div>
          ))
        }
    </div>
    }
    </div>
  )
}

export default MediaMainPage