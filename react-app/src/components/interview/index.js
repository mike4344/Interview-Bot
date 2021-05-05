import React, { useState, useEffect } from "react";
import VideoRecorder from 'react-video-recorder'
import {useSelector} from 'react-redux'
//import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Speech from 'react-speech';
export default function Interview() {
    const user = useSelector(state => state.session.user)
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [question, setQuestion] = useState(false)

    useEffect(async ()=>{

      await faceapi.loadSsdMobilenetv1Model('/facemodels')
      await faceapi.loadTinyFaceDetectorModel('/facemodels')
      await faceapi.loadFaceLandmarkModel('/facemodels')
      await faceapi.loadFaceLandmarkTinyModel('/facemodels')
      await faceapi.loadFaceRecognitionModel('/facemodels')
      await faceapi.loadFaceExpressionModel('/facemodels')
    },[])


    useEffect(()=>{
      (async()=>{
        let getQuestionJSON = await fetch('/api/questions')
        let getQuestion = await getQuestionJSON.json()
        setQuestion(getQuestion.question)
      })()
    },[])
  const mostLikelyExpression ={ angry: 0, disgusted: 0, fearful:0, happy: 0, sad: 0, neutral: 0, surprised: 0,}

  const startDetections = async () => {

    SpeechRecognition.startListening({ continuous: true })


    let interval = setInterval(async () => {
      const videoTag=document.getElementById('video');
      if (videoTag){
         let emotionDetection = await faceapi.detectSingleFace(videoTag).withFaceLandmarks().withFaceExpressions()

         if (emotionDetection !== undefined){
            let expressions = emotionDetection.expressions
            console.log(expressions)
              const mostLikelyExpressionForSlice = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b)
              mostLikelyExpression[mostLikelyExpressionForSlice] += 1
              console.log(mostLikelyExpression)
            }
          }else {
        clearInterval(interval)
      }
      }, 2000)
  }

	return (
		<div className='box' style={{height:600}}>
             <VideoRecorder
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
        console.log('videoBlob', file)
        formData.append('video', file)
      let video = await fetch(`/api/videos/0/${question.id}/${user.id}`, {
          method: 'POST',
          body: formData
      })
      await fetch('/api/feedback/0', {
        method: 'POST',
        body : JSON.stringify({
        'feedback_text': transcript,
        'feedback_video': mostLikelyExpression,
        'video_id': video.id,
        'question_id': question.id
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
