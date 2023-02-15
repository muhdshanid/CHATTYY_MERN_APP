import React from 'react'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useSelector } from 'react-redux'

const Room = ({roomID}) => {
    const {user} = useSelector(state => state.authReducer)
    const myMeeting = async (element) => {
        const appID = 1837557302;
      const serverSecret = "57983f0da0e153773babef8b8ea2182a";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, 
        serverSecret, roomID,user._id,user.name);
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:"Copy Link",
                    url:`http://localhost:3000/room/${roomID}`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton:false
        })
    }
  return (
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default Room