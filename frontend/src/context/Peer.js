import React, { createContext, useContext, useMemo, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const PeerContext = createContext(null)

export const usePeer = () => useContext(PeerContext)
export const PeerProvider = ({children}) => {
    const [remoteStream, setRemoteStream] = useState(null)
    const peer = useMemo(()=>new RTCPeerConnection({
        iceServers:[
            { urls: [
                'stun:stun.l.google.com:19302',
                'stun:global.stun.twilio.com:3478'
            ]
             },
        ]
    }),[])
    const createOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }
    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }
    const handleTrackEvent = useCallback((ev)=>{
        const streams = ev.streams;
        setRemoteStream(streams[0])
    },[])
    const sendStream = async(stream) => {
        const tracks = stream.getTracks()
        for(const track of tracks){
            peer.addTrack(track,stream)
        }
    }
    useEffect(()=>{
        peer.addEventListener("track",handleTrackEvent)
        return () => {
            peer.removeEventListener("track",handleTrackEvent)
        }
    },[ handleTrackEvent, peer])
    const setRemoteAnswer = async (ans) => {
        await peer.setRemoteDescription(ans)
    }
    
    return ( 
        <PeerContext.Provider value={{remoteStream,peer,createOffer,createAnswer,setRemoteAnswer,sendStream}}>
            {children}
        </PeerContext.Provider>
    )
}