import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import ReactPlayer from 'react-player'
export default function Feedback() {
    const user = useSelector(state => state.session.user)
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [allFeedback, setAllFeedback] = useState(null);
    const [video, setVideo] = useState(false)
    const [prevalentEmotion, setPrevalentEmotion] = useState('')
    const [feedbackSwitch, setFeedbackSwitch] = useState(false)
    useEffect(()=>{
      (async ()=> {
            const feedbackJson = await fetch(`/api/feedback/${user.id}/all`)
            let feedback = await feedbackJson.json()
            setAllFeedback(feedback.feedback)
            setCurrentFeedback(feedback.feedback[0])
        })()
    },[feedbackSwitch])
    const deleteHandler = async (e) => {
        let feedbackId = e.target.id
        await fetch(`/api/feedback/${feedbackId}`, {method: 'DELETE'})
        setFeedbackSwitch(!feedbackSwitch)
    }


    useEffect(() =>{
        if(currentFeedback){
            let prevalent = ''
            let percent = -1
            parser(currentFeedback.feedback_video).forEach( e =>{
                if (e.percent !== '' && e.percent > percent){
                    percent = e.percent
                    prevalent = e.emotion
                }
            })
            setPrevalentEmotion(prevalent)
        }
    }, [currentFeedback])

    const feedbackSorter = () =>{
            switch(prevalentEmotion) {
                case 'angry':
                    return 'One of the most prominent emotion that the facial recognition picked up is anger, you want to be cautious of displaying this emotion. While anger may be an appropriate response in the right context be mindful of overuse as it can come off aggressive.'
                case 'disgusted':
                    return 'One of the most prominent emotion that the facial recognition picked up is disgust, you want to be cautious of displaying this emotion. While disgust may be an appropriate response in the right context be mindful of overuse as it can come off negatively.'
                case 'fearful':
                    return 'One of the most prominent emotion that the facial recognition picked up is fear, you want to be cautious of displaying this emotion. This may display a lack of confidence. You want to avoid this as if you do not seem confident in yourself the interviewer won\'t either.'
                case 'sad':
                    return 'One of the most prominent emotion that the facial recognition picked up is sadness, you want to be cautious of displaying this emotion. While sadness may be an appropriate response in the right context be mindful of overuse as it can come off as unhappy about the opportunity.'
                case 'neutral':
                    return 'One of the most prominent emotion that the facial recognition picked up is neutrality, this response is ok. It would be optimal to appear happy most of the time but it is not a bad thing to be neutral at points'
                case 'surprised':
                    return 'One of the most prominent emotion that the facial recognition picked up is surprise, it is ok to appear surprised at times as it can show a deeper level of engagement with the question, however this should not be your most prominent emotion. '
                case 'happy':
                    return 'One of the most prominent emotion that the facial recognition picked up is happiness, this is the best possible outcome. You want to seem happy about the opportunity and they can really see themselves working with a positive person like you!'
                                }
        }

    const checkForRepeats = (transcript) => {
        let words = transcript.split(' ')
        let wordCounts = {}
        words.forEach(word => {
            if (wordCounts[word]){
                wordCounts[word] += 1
            } else {
                wordCounts[word] = 1
            }
        })
        let topWords = []
        for (let i = 0; i < 3; i++) {
            let topWord = Object.keys(wordCounts).reduce((currentMax, currentCheck) => wordCounts[currentMax] > wordCounts[currentCheck] ? currentMax : currentCheck);
            topWords.push({'word' : topWord, 'count' :wordCounts[topWord]})
            wordCounts[topWord] = 0
        }
        return topWords

    }

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
                    <li key={i} id={i} className = 'interview-feedback-list'
                    onClick={()=>{
                        setCurrentFeedback(allFeedback[i])
                    }}
                    >{feedback.question.questions_text}
                    {currentFeedback === feedback && <button className="button" id={feedback.id} onClick={deleteHandler}>Delete</button>}
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
                                <div className='emotion_container'>
                                    <div className='emotion-box'>
                                    {
                                    (parser(currentFeedback.feedback_video)).map((e, i) =>(
                                        <div key={i}
                                        className='emotion'
                                        >
                                            {e.emotion}
                                            {i < 7 && ` ${e.percent}%`}
                                        </div>)
                                    )
                                    }
                                    </div>
                                    <div className='emotional-feedback-extended'>


                                    {prevalentEmotion.length > 0 &&
                                        <div className='prevalent-emotion'>
                                            {feedbackSorter(prevalentEmotion)}
                                        </div>}
                                    </div>
                                </div>
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
                        </div>
                                <div className='emotional-feedback'>
                                 <h2 className='bottom-header'>Likelihood to Offend <span style={{color: + currentFeedback.feedback_text.split(':')[1] < 30 ? 'green': currentFeedback.feedback_text.split(':')[1] < 60 ? 'yellow':currentFeedback.feedback_text.split(':')[1] > 59 ? 'red': 'white' }}>{currentFeedback.feedback_text.split(':')[1]}%</span>
                                 </h2>
                                 <div className="text-feedback-box">
                                 <div className='text-feedback-info'> These were the top three most frequent words you used. This is not necessarily a bad thing just feedback to be mindful of</div>
                                    <div className='frequent-word-container'>
                                    { checkForRepeats(currentFeedback.feedback_text.split(':')[0]).map((topWord, rank) => (
                                        <div className='frequent-word'>{rank===0?"first": rank===1?"second":rank===2?"third":'no'}: "{topWord.word}" was said {topWord.count} times</div>
                                    ))
                                    }
                                    </div>
                                    </div>
                                </div>
                    </div>}
                    {!video && <img className='standing-robot' src='/robotstanding.png' />}
                </div>
            }

		</div>
	);
}
