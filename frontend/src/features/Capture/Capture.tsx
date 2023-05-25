import Webcam from 'react-webcam'
import { useRef, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './Capture.module.scss'
import { Button, Skeleton } from '@mui/material'
import faceApi from '~/service/api/detectFace/faceApi'

const cx = classNames.bind(styles)

const videoConstraints = {
  width: 1000,
  height: 720,
  facingMode: {
    exact: 'user'
  }
}

interface CaptureProps {
  setUrl: any
  width?: number
}

const Capture = ({ setUrl, width }: CaptureProps) => {
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder>()
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const [isShowVideo, setIsShowVideo] = useState(false)

  useEffect(() => {
    if (webcamRef?.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      })
      setIsShowVideo(true)
    }
  }, [webcamRef])

  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      const { data } = event
      if (data.size > 0) {
        setRecordedChunks((prev) => [...prev, data])
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    if (mediaRecorderRef && webcamRef?.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      })
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
      mediaRecorderRef.current.start()
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style.display = 'none'
      a.href = url
      a.download = 'react-webcam-stream-capture.webm'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  const handleIdentify = async () => {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    })
    const file = new File([blob], 'video.webm')
    const formData = new FormData()
    formData.append('file', file)
    const response = await faceApi.detectFace(formData)
    if (response) {
      alert('Đã nhận diện')
    }
  }

  const onUserMedia = () => {
    console.log('Webcam start')
  }

  const startCam = () => {
    setIsShowVideo(true)
  }

  const stopCam = () => {
    if (webcamRef?.current?.stream) {
      const stream = webcamRef.current.stream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      setIsShowVideo(false)
    }
  }

  return (
    <div className={cx('capture-container')}>
      {isShowVideo ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          imageSmoothing={true}
          screenshotFormat='image/jpeg'
          videoConstraints={width ? videoConstraints : { ...videoConstraints, width: width }}
          onUserMedia={onUserMedia}
        />
      ) : (
        <Skeleton variant='rectangular' width={868} height={490} />
      )}
      <div className={cx('detect-face')}></div>
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Kết thúc</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Bắt đầu nhận diện</button>
      )}
      {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button variant='contained' onClick={handleIdentify}>
          Identify
        </Button>
        <Button variant='contained' onClick={startCam}>
          Start
        </Button>
        <Button variant='contained' onClick={stopCam}>
          Stop
        </Button>
      </div>
    </div>
  )
}

export default Capture
