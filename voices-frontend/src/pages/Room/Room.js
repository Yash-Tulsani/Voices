import React,{useState} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC';

function Room() {
  const {clients}=useWebRTC();
  return (
    <div>
      <h1>All connected Clients</h1>
      {
        clients.map((client)=>(
          <div key={client.id}>
            <audio controls autoPlay></audio>
            <h4>{client.name}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default Room;