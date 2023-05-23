import Webcam from 'react-webcam'
import { useRef, useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './Capture.module.scss'
import { Button } from '@mui/material'

const cx = classNames.bind(styles)

const videoConstraints = {
  width: 700,
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

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setUrl(imageSrc)
    }
  }, [webcamRef, setUrl])

  const onUserMedia = (e: any) => {
    console.log(e)
  }

  return (
    <div className={cx('capture-container')}>
      <Webcam
        ref={webcamRef}
        audio={false}
        imageSmoothing={true}
        screenshotFormat='image/jpeg'
        videoConstraints={width ? videoConstraints : { ...videoConstraints, width: width }}
        onUserMedia={onUserMedia}
      />
      <div className={cx('detect-face')}></div>
      <Button variant='contained' onClick={capturePhoto}>
        Check
      </Button>
    </div>
  )
}

export default Capture
