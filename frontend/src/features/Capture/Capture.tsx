import Webcam from 'react-webcam'
import { useRef, useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './Capture.module.scss'
import { Button, ExtendButtonBase, ButtonTypeMap } from '@mui/material'
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const cx = classNames.bind(styles)

const videoConstraints: MediaTrackConstraints = {

  facingMode: {
    exact: 'user'
  }
}

interface CaptureProps {
  setUrl: any
  width?: number
  height?: number
}

const Capture = ({ setUrl, width, height }: CaptureProps) => {
  const webcamRef = useRef<Webcam>(null)
  // const captureBtnRef = useRef<any>(null)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  // const mediaStreamRef = useRef<MediaStream | null>(null)
  // const takeVideo = useCallback(async () => {
  //   if (mediaStreamRef.current) {
  //     const stream = mediaStreamRef.current
  //     let recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=h264' });
  //     let data: Blob[] = [];

  //     recorder.ondataavailable = (event) => data.push(event.data);
  //     recorder.start();
  //     recorder.onstop = (ev) => {
  //       let blob = new Blob(data, { type: 'video/webm' });
  //       let url = URL.createObjectURL(blob);
  //       window.open(url);


  //       var formdata = new FormData();
  //       formdata.append("video", blob, "authentication.webm");

  //       var requestOptions = {
  //         method: 'POST',
  //         body: formdata
  //       };

  //       fetch("http://localhost:3500/uploadVideo", requestOptions)
  //         .then(response => response.text())
  //         .then(result => console.log(result))
  //         .catch(error => console.log('error', error));
  //     };
  //     recorder.onerror = (event) => console.error(event);

  //     setTimeout(() => {
  //       if (recorder.state === "recording") {
  //         recorder.stop();
  //       }
  //     }, 10 * 1000);
  //   }
  // }, [mediaStreamRef, setUrl])
  // const capturePhoto = takeVideo;

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      setBtnDisabled(true);
      let imageCount = 0;
      let cam = webcamRef.current;
      let formdata = new FormData();
      let timeId = setInterval(async () => {
        const imageSrc = cam.getScreenshot();
        if (imageSrc) {
          imageCount++;
          setProgress(imageCount);
          let blob = await fetch(imageSrc).then(r => r.blob());
          formdata.append("images", blob, `${imageCount}.jfif`)
          if (imageCount == 30) {
            clearInterval(timeId);
            var requestOptions = {
              method: 'POST',
              body: formdata,
              // redirect: 'follow'
            };

            fetch("http://localhost:3500/uploadImages", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error))
              .finally(()=>{
                setBtnDisabled(false);
              });
          }
        }
      }, 200);

    }
  }, [webcamRef, setBtnDisabled, setProgress])



  const onUserMedia = (stream: MediaStream) => {
    // mediaStreamRef.current = stream;
  }
  let _videoConstraints = videoConstraints;
  if (width) {
    _videoConstraints.width = width;
  }
  if (height) {
    _videoConstraints.height = height;
  }
  return (
    <div className={cx('capture-container')}>
      <Webcam
        ref={webcamRef}
        audio={false}
        imageSmoothing={true}
        screenshotFormat='image/jpeg'
        videoConstraints={_videoConstraints}
        width={600}
        height={320}
        onUserMedia={onUserMedia}
      />
      <div className={cx('capture-frame-box-progress')} 
           style={{visibility: (btnDisabled ? "visible" : "collapse"), width: (10 * progress)}}></div>
      <div className={cx('detect-face')}></div>
      <Button className={cx("capture-button")} 
              variant='contained' 
              onClick={capturePhoto}
              disabled={btnDisabled}
              >
        Check
      </Button>
    </div>
  )
}

export default Capture
