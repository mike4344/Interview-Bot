import React, { useState, useEffect } from "react";
import VideoRecorder from 'react-video-record-mike'
import {useSelector} from 'react-redux'
import * as faceapi from 'face-api.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Speech from 'react-speech';
import {useHistory} from 'react-router-dom'
export default function Interview() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [question, setQuestion] = useState(false)
    const [obj, setObj] = useState({})



    useEffect(()=>{
      (async()=>{
        let getQuestionJSON = await fetch('/api/questions/')
        let getQuestion = await getQuestionJSON.json()
        await faceapi.loadSsdMobilenetv1Model('/')
        await faceapi.loadTinyFaceDetectorModel('/')
        await faceapi.loadFaceLandmarkModel('/')
        await faceapi.loadFaceLandmarkTinyModel('/')
        await faceapi.loadFaceRecognitionModel('/')
        await faceapi.loadFaceExpressionModel('/')

        setQuestion(getQuestion.question)
      })()
    },[])
    let mostLikelyExpression
    const startDetections = async () => {
      mostLikelyExpression ={ angry: 0, disgusted: 0, fearful:0, happy: 0, sad: 0, neutral: 0, surprised: 0,}
    SpeechRecognition.startListening({ continuous: true })


    let interval = setInterval(async () => {
      const videoTag=document.getElementById('video');
      if (videoTag){
         let emotionDetection = await faceapi.detectSingleFace(videoTag).withFaceLandmarks().withFaceExpressions()

         if (emotionDetection !== undefined){
            let expressions = emotionDetection.expressions
              const mostLikelyExpressionForSlice = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b)
              mostLikelyExpression[mostLikelyExpressionForSlice] += 1
              setObj(mostLikelyExpression)
            }

          }else {
        clearInterval(interval)
      }
      }, 2000)
  }
  async function videoRecordComplete(videoBlob) {
        SpeechRecognition.stopListening()
        let formData = new FormData()
        var file = new File([videoBlob], "video.webm", {lastModified: 1534584790000});
        formData.append('video', file)
          let videoJson = await fetch(`/api/videos/0/${question.id}/${user.id}`, {
          method: 'POST',
          body: formData
      })
      let video = await videoJson.json()
      await fetch('/api/feedback/0', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
        'feedback_text': transcript,
        'feedback_video': obj,
        'video_id': video.id,
        'question_id': question.id,
        'user_id': user.id
        })
      })
      history.push('/feedback')
    }


	return (
		<div className='interview-box' >
      <div className='interview-advice-list-box' >
        <ul className='interview-advice-list' >
          <li className='interview-advice-header'>Virtual Interview Tips</li>
          <li className='interview-advice'>Make sure you are centered </li>
        <li className='interview-advice-sub'>We want the interview to focused on you</li>
          <li className='interview-advice'>Click on the question to read it aloud</li>
        <li className='interview-advice-sub'>Sometimes hearing it read aloud can help avoid confusion with the questions intent</li>
          <li className='interview-advice'>Remember to smile!</li>
        <li className='interview-advice-sub'>This bot uses facial recognition and emotion prediction technology to assess what emotion you are most likely coming across as.</li>
          <li className='interview-advice'>Annunciate</li>
        <li className='interview-advice-sub'>The bot will transcribe your audio, if it cannot understand what you said, an interviewer might not either!</li>
          <li className='interview-advice'>Be Professional</li>
        <li className='interview-advice-sub'>The bot will filter your responses for the likelyhood to offend someone, so be nice and respectful to the bot</li>
        </ul>
      </div>
             <VideoRecorder
              countdownTime={0}
            dataAvailableTimeout={10000}
             replayVideoAutoplayAndLoopOff
             onStartRecording={startDetections}
             mimeType="video/webm"
    onRecordingComplete={videoRecordComplete}
  />
    {question && <div className='question'>
      <div className='welcome'>Welcome To Botco!</div>
      <Speech
        pitch="1"
        rate="1"
        volume="1"
        lang="en-GB"
        voice="Google UK English Male"
        textAsButton={true}
        text ={question.questions_text} />
    <img src="/robot-waving.gif" />
    </div>}
		</div>
	);
}
