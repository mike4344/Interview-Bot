import React, { useState, useEffect } from "react";
import VideoRecorder from 'react-video-recorder'
//import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
const startDetections = (source) => {
  console.log(source)
  setInterval(async () => {
    await faceapi.loadSsdMobilenetv1Model('/facemodels')
    await faceapi.loadTinyFaceDetectorModel('/facemodels')
    //  await faceapi.loadMtcnnModel('/facemodels')
    await faceapi.loadFaceLandmarkModel('/facemodels')
    await faceapi.loadFaceLandmarkTinyModel('/facemodels')
    await faceapi.loadFaceRecognitionModel('/facemodels')
    await faceapi.loadFaceExpressionModel('/facemodels')
    // await faceapi.nets.tinyFaceDetector.loadFromUri('/facemodels')
    // await faceapi.nets.faceLandMark68Net.loadFromUri('/facemodels')
    // await faceapi.nets.faceRecognitionNet.loadFromUri('/facemodels')
    // await faceapi.nets.faceExpressionNet.loadFromUri('/facemodels')
    const emotionDetection = await faceapi.detectSingleFace('video')
    .withFaceLandmarks().withFaceExpressions()
    console.log(emotionDetection)
  }, 500)
}
export default function Interview() {

	return (
		<div className='box'>
             <VideoRecorder
             dataAvailableTimeout={5000}
             replayVideoAutoplayAndLoopOff
             onStartRecording={startDetections}
             mimeType="video/webm"
    onRecordingComplete={async videoBlob => {
        let formData = new FormData()
        var file = new File([videoBlob], "video.webm", {lastModified: 1534584790000});

        console.log('videoBlob', file)
        formData.append('video', file)
      await fetch('/api/videos/0', {
          method: 'POST',
          body: formData
      })
    }}
  />

		</div>
	);
}
