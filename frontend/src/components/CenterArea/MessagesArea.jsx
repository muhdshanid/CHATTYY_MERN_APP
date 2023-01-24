import React from 'react'
import Message from './Message'

const MessagesArea = () => {
  return (
    <div className='w-full grow pt-2 overflow-hidden overflow-y-scroll'>
        <div className='p-2 flex flex-col gap-4  justify-center'>
          <Message/>
          <Message/>
          <Message/>
        </div>
    </div>
  )
}

export default MessagesArea