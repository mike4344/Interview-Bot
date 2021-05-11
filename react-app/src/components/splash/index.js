import React, { useState, useEffect } from "react";

export default function Interview() {
    const [current, setCurrent] = useState(0)
const intro = [

    'Hi I am Dr.Bot and welcome to Botco!',
    'I am here to help you prepare for your next interview!',
    "I don't sleep so I am always available for on-demand mock interviews",
    'I can speak too! just click on the question on the interview screen and I will read it to you',
    ' I will scan your face and grab your most likely emotion ',
    ' I will do my best to get it right but we all make mistakes ',
    ' so if I make any guesses at your emotions that are incorrect I am sorry ',
    'but if I think you seem to be angry, happy, sad etc... then an interviewer might too',
    'I will also listen to your answer and write it down',
    'So please speak slowly and clearly so I can make sure to get it all',
    'I will go through your response and let you know if your answer may be offensive',
    'So please be polite, you humans can come up with some pretty creative bad words so I may miss some',
    'I will also record your answer on video for you to watch later',
    'Watching yourself can be helpful!',
    'Think if it was not you on the video what would you think of the answer you gave and how you gave it',
    ' I also have neat guide on interviews with some tips to hopefully help you!',
    'Good luck I look forward to helping you get your next job!',
]
useEffect(() => {
        setTimeout(() => {
             current === intro.length-1 ? setCurrent(0) : setCurrent(prev => current + 1)
            }, 5000)
    }, [current]
)


	return (
		<div className='splash-container' style={{height:600}}>
          <img className="robot-waving-info" src='https://i.pinimg.com/originals/50/38/f6/5038f6672f089f3a50c4f075feddfc42.gif' />
            <div className='splash-header welcome'>Welcome to Interview Bot Io</div>
            <div className='splash-instruction-box' >
                <div className='arrow-left' >
                <div className='arrow-left2' ></div>
                </div>
            {intro[current]}
            </div>
            <img className="robot-standing-info" src='/robotstanding.png' />
		</div>
	);
}
