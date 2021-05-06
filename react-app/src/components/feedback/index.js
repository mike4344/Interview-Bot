import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import ReactPlayer from 'react-player'
export default function Feedback() {
    const user = useSelector(state => state.session.user)
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [allFeedback, setAllFeedback] = useState(null);
    useEffect(()=>{
      (async ()=> {
            const feedbackJson = await fetch(`/api/feedback/${user.id}/all`)
            let feedback = await feedbackJson.json()
            setAllFeedback(feedback.feedback)
            setCurrentFeedback(feedback.feedback[0])
        })()
    },[])

	return (
		<div className='feedback-container' >
            <ul className='feedback-list'>
            {allFeedback && allFeedback.map((feedback, i) =>(
                <li key={i} id={i}
                onClick={()=>{
                    setCurrentFeedback(allFeedback[i])
                }}
                >{feedback.question.questions_text}
                </li>
                ))}
            </ul>
            {allFeedback && currentFeedback && (
                <div className='current-feedback-container'>
                    <ReactPlayer
                    controls={true}
                    url={currentFeedback.video.video} />
                    <div className='question_text'>
                        {currentFeedback.question.questions_text}
                    </div>
                    <div className='question_answer'>
                        {currentFeedback.question.questions_answer}
                    </div>
                    <div className='emotional-feedback'>
                        {currentFeedback.feedback_video}
                    </div>
                    <div className='text-feedback'>
                        {currentFeedback.feedback_text}
                    </div>
                </div>
            )}

		</div>
	);
}
