import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './participant';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <button className='switch' onClick={handleLogout}>leave interview</button>
      <h2>Welcome to the live interview</h2>
      <div className="live-video-box">

      <div className="local-participant">
        {room ? (
          <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
          />
          ) : (
          ''
        )}
      </div>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
    </div>
  );
};

export default Room;
