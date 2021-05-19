import React, { useState, useCallback, useEffect } from 'react';
import {useSelector} from 'react-redux'
import Room from './room';
import io from 'socket.io-client'

let socket = io()

function VideoChat () {
  const user = useSelector(state => state.session.user)
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [searching, setSearching] = useState(false)

  useEffect(()=>{
     socket.on("partner-found", data => {
      setRoomName(data)
      console.log(data)
    })
    // return ()=> {
    //   socket.removeAllListeners()
    // }
  }, [])

  useEffect(async()=>{
    if(roomName){
      console.log('i amher')

      const data = await fetch('/api/token/', {
        method: 'POST',
        body: JSON.stringify({
          identity: user.username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token)
    }
    }, [roomName])



  const handleJoin =
    async event => {
      event.preventDefault();
      setSearching(prev => !prev)
      socket.emit('searching', user)
    }
  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <div>
        {!searching && <button onClick={handleJoin}>Join live interview</button>}
        {searching && <p>Looking for partner...</p>}
      </div>
    );
  }
  return render;
};

export default VideoChat;
