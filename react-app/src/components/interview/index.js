import React, { useState, useEffect } from "react";
import VideoRecorder from 'react-video-record-mike'
import {useSelector} from 'react-redux'
//import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Speech from 'react-speech';
export default function Interview() {
    const user = useSelector(state => state.session.user)
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [question, setQuestion] = useState(false)
    const [obj, setObj] = useState({})



    useEffect(()=>{
      (async()=>{
        let getQuestionJSON = await fetch('/api/questions/')
        let getQuestion = await getQuestionJSON.json()
        await faceapi.loadSsdMobilenetv1Model('/')
        console.log('1 success')
        await faceapi.loadTinyFaceDetectorModel('/')
        console.log('2 success')
        await faceapi.loadFaceLandmarkModel('/')
        console.log('3 success')
        await faceapi.loadFaceLandmarkTinyModel('/')
        console.log('4 success')
        await faceapi.loadFaceRecognitionModel('/')
        console.log('5 success')
        await faceapi.loadFaceExpressionModel('/')
        console.log('6 success')

        setQuestion(getQuestion.question)
      })()
    },[])
    let mostLikelyExpression
    const startDetections = async () => {
      console.log('startDetections')
      mostLikelyExpression ={ angry: 0, disgusted: 0, fearful:0, happy: 0, sad: 0, neutral: 0, surprised: 0,}
    SpeechRecognition.startListening({ continuous: true })


    let interval = setInterval(async () => {
      console.log('interval')
      const videoTag=document.getElementById('video');
      if (videoTag){
         let emotionDetection = await faceapi.detectSingleFace(videoTag).withFaceLandmarks().withFaceExpressions()

         if (emotionDetection !== undefined){
            let expressions = emotionDetection.expressions
            console.log(expressions)
              const mostLikelyExpressionForSlice = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b)
              mostLikelyExpression[mostLikelyExpressionForSlice] += 1
              console.log(mostLikelyExpression, 'thissssssss')
              setObj(mostLikelyExpression)
            }

          }else {
        clearInterval(interval)
      }
      }, 2000)
  }

	return (
		<div className='box' style={{height:600}}>
             <VideoRecorder
              countdownTime={3000}
            dataAvailableTimeout={10000}
             replayVideoAutoplayAndLoopOff
             onStartRecording={startDetections}
             mimeType="video/webm"
    onRecordingComplete={async videoBlob => {
        console.log('transcript',transcript)
        SpeechRecognition.stopListening()
        let formData = new FormData()
        var file = new File([videoBlob], "video.webm", {lastModified: 1534584790000});
        console.log(mostLikelyExpression)
        console.log('mostlikelyexpression',obj)
        console.log('videoBlob', file)
        formData.append('video', file)
          let videoJson = await fetch(`/api/videos/0/${question.id}/${user.id}`, {
          method: 'POST',
          body: formData
      })
      let video = await videoJson.json()
      console.log(video)
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
    }}
  />
    {question && <div className='question'>
      <Speech
        pitch="1"
        rate="1"
        volume="1"
        lang="en-GB"
        voice="Google UK English Male"
        text ={question.questions_text} />

      {question.questions_text}

    </div>}
		</div>
	);
}
