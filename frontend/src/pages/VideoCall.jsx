import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { usePeer } from '../context/Peer'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player';

const VideoCall = () => {
    const {peer,createOffer,remoteStream,createAnswer,sendStream,setRemoteAnswer} = usePeer()
    const [myStream, setMyStream] = useState(null)
    const [remoteEmailId, setRemoteEmailId] = useState()

    const {socket} = useSocket()
    const handleNewUserJoined = useCallback(async({email}) => {
        console.log(email,'user joined');
        const offer = await createOffer()
        socket.emit("call-user",{email,offer})
        setRemoteEmailId(email)
    },[createOffer,socket])
    const handleIncommingCall = useCallback(async(data)=>{
        const {from,offer} = data
        console.log("incomming call from",from,offer);
        const ans = await createAnswer(offer)
        socket.emit("call-accepted",{email:from,ans})
        setRemoteEmailId(from)
    },[createAnswer, socket])
   
    const handleNegotiation = useCallback(async()=>{
        const localOffer = await  peer.createOffer()
        socket.emit("call-user",{email:remoteEmailId,offer:localOffer})
    },[peer, remoteEmailId, socket])
    const getUserMediaStream = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setMyStream(stream)
    },[])
    useEffect(()=>{
        peer.addEventListener("negotiationneeded",handleNegotiation)
        return () => {
            peer.removeEventListener("negotiationneeded",handleNegotiation)
        }
    },[handleNegotiation, peer])
    const handleCallAccepted = useCallback(async(data) => {
        const {ans} = data
        console.log("call-got-accepted",ans);
        await setRemoteAnswer(ans)
        
    },[ setRemoteAnswer])
    useEffect(()=>{
        socket.on("user-joined",handleNewUserJoined)
        socket.on("incomming-call",handleIncommingCall)
        socket.on("call-accepted",handleCallAccepted)
        return () => {
            socket.off("user-joined",handleNewUserJoined)
            socket.off("incomming-call",handleIncommingCall)
            socket.off("call-accepted",handleCallAccepted)

        }
    },[socket, handleNewUserJoined, handleIncommingCall, handleCallAccepted])
    useEffect(()=>{
        getUserMediaStream()
    },[getUserMediaStream])
  return (
    <div className='w-screen flex items-center justify-center h-screen bg'>
    <div className='w-[95%] overflow-hidden flex border flex-col  bg-white h-[95%] rounded-lg '>
        <h4>you are conntected to {remoteEmailId}</h4>
        <button className='bg-purple-500 h w-20 flex items-center justify-center m-8 rounded-lg p-4'
         onClick={(e)=>sendStream(myStream)}>send my video</button>
    <ReactPlayer url={myStream} playing muted />
    <ReactPlayer url={remoteStream} playing  />
    </div>
</div>
  )
}

export default VideoCall