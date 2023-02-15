import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Room from './Room'
const RoomPage = () => {
    const {roomID} = useParams()
   
  return (
    <div>
        <Room roomID={roomID}/>
    </div>
  )
}

export default RoomPage