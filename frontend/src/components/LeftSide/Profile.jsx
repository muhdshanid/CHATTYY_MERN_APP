import React from 'react'
import ProfileMain from './ProfileMain'
import ProfileNav from './ProfileNav'

const Profile = () => {
  return (
    <div className='flex  flex-col '>
        <ProfileNav/>
        <ProfileMain/>
    </div>
  )
}

export default Profile