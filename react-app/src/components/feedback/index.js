import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import ReactPlayer from 'react-player'
export default function Feedback() {
    const user = useSelector(state => state.session.user)
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [allFeedback, setAllFeedback] = useState(null);
    const [video, setVideo] = useState(false)
    useEffect(()=>{
      (async ()=> {
            const feedbackJson = await fetch(`/api/feedback/${user.id}/all`)
            let feedback = await feedbackJson.json()
            setAllFeedback(feedback.feedback)
            setCurrentFeedback(feedback.feedback[0])
        })()
    },[])
    const parser = (emotionString) =>{
        let splitEmotion = emotionString.split('/')
        return splitEmotion.map(eString => {
            let e = eString.split(':')
            return {emotion: e[1], percent:e[0]}
        })
    }
	return (
		<div className='feedback-box' >
            <div className='interview-advice-list-box'>
                <ul className='interview-advice-list feedback'>
                {allFeedback && allFeedback.map((feedback, i) =>(
                    <li key={i} id={i} className = 'interview-advice'
                    onClick={()=>{
                        setCurrentFeedback(allFeedback[i])
                    }}
                    >{feedback.question.questions_text}
                    </li>
                    ))}
                </ul>
            </div>
            {allFeedback && currentFeedback &&
                <div className="feedback-container">
                    <button className='switch' onClick={()=> setVideo(!video)}>{video ? 'Switch to text' : "Switch to video"}</button>
                   {video && <div className='video'>
                    <ReactPlayer className='video player'
                    controls={true}
                    style={{}}
                    height='30vw'
                    width='50vw'
                    url={currentFeedback.video.video} />
                    <img className='robot_corner' src='/robot-corner.png' />
                    </div>}
                       {video &&
                            <div className='emotional-feedback'>
                                <h2 className='bottom-header'>Emotional Feedback</h2>
                                {
                                (parser(currentFeedback.feedback_video)).map((e, i) => (
                                    <div key={i}
                                    className='emotion'
                                    >
                                        {e.emotion}
                                        {i < 7 && ` ${e.percent}%`}
                                    </div>

                                ))
                                }
                            </div>}

                    {!video &&
                    <div className='content'>
                        <div className='question_box' >
                            <div className='question_text'>
                               <div className='title'> Question: </div>{currentFeedback.question.questions_text}
                            </div>
                            <div className='question_answer'>
                            <div className='title'> Answer: </div> {currentFeedback.question.questions_answer}
                            </div>
                        </div>
                            <div className='text-feedback'>
                            <div className='title'> Answer Transcript: </div>  {currentFeedback.feedback_text.split(':')[0]}
                        </div   >
                                <div className='emotional-feedback'>
                                 <h2 className='bottom-header'>Likelyhood to offend {currentFeedback.feedback_text.split(':')[1]} %
                                 </h2>
                            </div>
                    </div>}
                    <img className='standing-robot' src='/robotstanding.png' />
                </div>
            }

		</div>
	);
}
