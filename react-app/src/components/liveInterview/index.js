import React from "react";
import VideoChat from "./videoChat"


function LiveInterview() {

  return (
  <div className="interview-box-live">
    <div className="interview-advice-list-box">
      <ul className="interview-advice-list-live">
        <li className='interview-advice-header'>Live Mock Interview Instructions</li>
        <li className='interview-advice-live'>1. Most important be respectful and professional</li>
        <li className='interview-advice-live'>2. When you are ready for the interview, click the "Find an interview partner" button</li>
        <li className='interview-advice-live'>3. This will put you into a matchmaking queue until you are matched with a partner</li>
        <li className='interview-advice-live'>4. When a partner is found both your video and audio will be turned on so make sure to give Interview Bot IO permission to access these</li>
        <li className='interview-advice-live'>5. Once you are both in the room, introduce yourselves in a professional manner</li>
        <li className='interview-advice-live'>6. After introductions discuss with your partner who will be interviewer first</li>
        <li className='interview-advice-live'>7. Below the video we will generate 3 random interview questions, use these to interview your partner</li>
        <li className='interview-advice-live'>8. once the the first interview is over, give constructive feedback to your partner</li>
        <li className='interview-advice-live'>9. Be kind and honest in your feedback, be objective avoid any personal biases and speak person to person</li>
        <li className='interview-advice-live'>10. Switch roles and repeat steps 7 - 9</li>
        <li className='interview-advice-live'>11. Upon completion thank each other for taking the time to interview, then either leave the interview room or go to another page</li>
      </ul>
    </div>
    <VideoChat />
  </div>);
}

export default LiveInterview;
