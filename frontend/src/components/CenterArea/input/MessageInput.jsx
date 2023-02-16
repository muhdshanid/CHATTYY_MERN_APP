
import { useContext } from 'react';
import { DataContext } from '../../../context/DataProvider';
import GroupMessageInput from './GroupMessageInput'
import PersonalMessageInput from './PersonalMessageInput';
const MessageInput = () => {
  const {selectedGroup,selectedChat ,} = useContext(DataContext);

  return (
    <div className='w-full rounded-tr-lg  rounded-tl-lg bg-white shadow-lg  shadow-black'>
        { selectedChat?._id && selectedGroup === null ?
          <div className='flex relative  items-center py-2 px-4 gap-2'>
            <PersonalMessageInput/>
        </div> : 
        <div className='flex relative  items-center py-2 px-4 gap-2'>
          <GroupMessageInput/>
        </div> 
        }
    </div>
  )
}

export default MessageInput