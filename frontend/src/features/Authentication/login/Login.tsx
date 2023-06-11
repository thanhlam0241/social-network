import styles from './Login.module.scss'
import classNames from 'classnames/bind'
// import WebcamStreamCapture from '../Webcam/Webcam'
import Capture from '../../Capture/Capture'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, InputLabel, Input, InputAdornment, LinearProgress } from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyIcon from '@mui/icons-material/Key'

import MyDialog from '~/components/components/Dialog/dialog'
import React from 'react'

import Cookies from 'js-cookie'

// import AuthenService from '~/service/api/authenticate/authenticateApi'
// import useAuth from '~/hooks/useAuth'

import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
import { setAuth, AuthState } from '~/service/redux/slice/authSlice'
import { useLoginMutation } from '~/service/redux/api/api'

const cx = classNames.bind(styles)

function LoginForm() {
  //const { setAuth } = useAuth()
  const dispatch = useAppDispatch()

  const [login, { isLoading, data, error }] = useLoginMutation()

  const navigate = useNavigate()
  //const [, setCookie] = useCookies()
  const [open, setOpen] = React.useState(false)
  const [imgSrc, setImgSrc] = React.useState<string | null>(null)

  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleLogin = async () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    if (username && password) {
      await login({ username, password })
    }
  }
  React.useEffect(() => {
    if (data) {
      dispatch(setAuth(data.user))
      Cookies.set('atk', data.user.token, { expires: 1000 * 60 * 60 * 24 })
      Cookies.set('rtk', data.refreshToken, { expires: 1000 * 60 * 60 * 24 * 7 })
      navigate('/')
    }
  }, [data])
  const handleNavigateRegister: React.MouseEventHandler<HTMLButtonElement> | undefined = () => {
    navigate('/authenticate/register')
  }
  return (
    <div className={cx('login-form')}>
      <h1 style={{ fontWeight: 1000, margin: 10 }}>Login</h1>
      <FormControl sx={{ width: '80%' }} variant='standard'>
        <InputLabel htmlFor='input-with-icon-adornment'>Username</InputLabel>
        <Input
          inputRef={usernameRef}
          sx={{ width: '100%' }}
          id='input-with-icon-adornment'
          placeholder='Type your username'
          defaultValue='thanhlam02412002'
          startAdornment={
            <InputAdornment position='start'>
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ width: '80%' }} variant='standard'>
        <InputLabel htmlFor='input-with-icon-password'>Password</InputLabel>
        <Input
          inputRef={passwordRef}
          sx={{ width: '100%' }}
          id='input-with-icon-password'
          placeholder='Type your password'
          defaultValue='thanhlam02412002'
          startAdornment={
            <InputAdornment position='start'>
              <KeyIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <Button onClick={handleLogin} variant='contained'>
        Login
      </Button>
      {!isLoading ? <div className={cx('div-horizon')} /> : <LinearProgress />}
      <p>
        Or login with{' '}
        <button onClick={handleClickOpen} className={cx('button-link-face-detection')}>
          Face dection
        </button>
      </p>
      <footer className={cx('footer-signup')}>
        <p>
          Don&apos;t have an account?{' '}
          <button className={cx('button-signup')} onClick={handleNavigateRegister}>
            Sign up
          </button>
        </p>
      </footer>
      <MyDialog title='Login by detect face' onClose={handleClose} open={open}>
        <Capture setUrl={setImgSrc} />
      </MyDialog>
    </div>
  )
}

export default LoginForm
