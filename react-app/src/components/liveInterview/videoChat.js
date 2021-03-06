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
  const [questions, setQuestions] = useState(null)


  useEffect(() =>{
    socket.emit('exit', user)
  },[])


  useEffect( ()=>{
    if(searching){
      socket.once("partner-found", data => {
        setRoomName(data)
      })
    }
    return ()=> socket.removeAllListeners()
  }, [searching])

  useEffect(async()=>{
    if(roomName){
        let getQuestionsJSON = await fetch('/api/questions/live')
        let getQuestions = await getQuestionsJSON.json()
        setQuestions(getQuestions.questions)
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
      setSearching(true)
      socket.emit('searching', user)
    }
  const handleLogout = useCallback(event => {
    setToken(null);
    socket.emit('exit', user)
    setRoomName(null);
    setSearching(false);
  }, []);

  let render;
  if (token) {
    render = (
      <div className='room-container'>
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      <div className='question-instructions'>
      Practice Interview Questions
      {questions && <div className='questions'>{questions.map(question =>(
        <div className='question-live'>{question.questions_text}</div>
        ))}</div>}
        </div>
      </div>

    );
  } else {
    render = (
      <div className='room-container'>
        {!searching && <button className="switch" onClick={handleJoin}>Find an interview partner</button>}
        {searching && <button className="switch" onClick={handleLogout}>Cancel Search</button>}
        {searching && <img className="searching" src='/robot-searching.gif' />}
        {!searching && <img className='searching' src='liveinterview.png' />}
      </div>
    );
  }
  return render;
};

export default VideoChat;
