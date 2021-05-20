import React, { useEffect } from "react";
import VideoChat from "./videoChat"
const { connect } = require('twilio-video');

let apiKeys = {
apiSid : process.env.REACT_APP_TWILIO_ACCOUNT_SID,
apiKey : process.env.REACT_APP_TWILIO_API_KEY,
apiKey2 : process.env.REACT_APP_TWILIO_API_KEY2,
apiSecret : process.env.REACT_APP_TWILIO_API_SECRET,

};


function LiveInterview() {

  return (
  <div className="app">
    <div className="instructions">

    </div>
    <VideoChat />
  </div>);
}

export default LiveInterview;
