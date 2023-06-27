import styles from './Login.module.scss'
import classNames from 'classnames/bind'
// import WebcamStreamCapture from '../Webcam/Webcam'
import Capture from '../../Capture/Capture'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, InputLabel, Input, InputAdornment } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyIcon from '@mui/icons-material/Key'

import MyDialog from '~/components/components/Dialog/dialog'
import React from 'react'

import Cookies from 'js-cookie'

import AuthenService from '~/service/api/authenticate/authenticateApi'
// import useAuth from '~/hooks/useAuth'

import { useAppDispatch } from '~/hooks/storeHook'
import { setAuth } from '~/service/redux/slice/authSlice'
import { useLoginMutation } from '~/service/redux/api/api'

const cx = classNames.bind(styles)

type LoginMethod = 'face' | 'password'

function LoginForm() {
  //const { setAuth } = useAuth()
  const dispatch = useAppDispatch()

  const [login, { isLoading, data, error }] = useLoginMutation()

  const navigate = useNavigate()
  //const [, setCookie] = useCookies()
  const [loginMethod, setLoginMethod] = React.useState<LoginMethod>('face')
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
    try {
      if (username && password) {
        await login({ username, password })
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    if (data) {
      dispatch(setAuth(data.user))
      Cookies.set('atk', data.user.token, { expires: 1 })
      Cookies.set('rtk', data.refreshToken, { expires: 7 })
      navigate('/')
    }
  }, [data])

  const handleLoginWithFaceId = async (data: Blob[]) => {
    await AuthenService.LoginWithFaceId(data)
      .then((res) => {
        if (res?.success && res?.data) {
          Cookies.set('atk', res?.data?.token, { expires: 1 })
          Cookies.set('rtk', res?.data?.refreshToken, { expires: 7 })
          if (setAuth) {
            setAuth(res.data)
            navigate('/main')
          }
        } else {
          alert(res)
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Some errors: ' + err?.message)
      })
  }
  const handleNavigateRegister: React.MouseEventHandler<HTMLButtonElement> | undefined = () => {
    navigate('/authenticate/register')
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: LoginMethod) => {
    setLoginMethod(newValue)
  }
  return (
    <div className={cx('login-form')}>
      <h1 style={{ fontWeight: 1000, margin: 10 }}>Login</h1>
      <Tabs style={{ margin: 0 }} value={loginMethod} onChange={handleTabChange} aria-label='disabled tabs example'>
        <Tab label='Face ID' value={'face'} />
        <Tab label='User-Pass' value={'password'} />
      </Tabs>
      {loginMethod === 'password' ? (
        <>
          <FormControl sx={{ width: '80%', margin: '0 0 10px 0' }} variant='standard'>
            <InputLabel htmlFor='input-with-icon-adornment'>Username</InputLabel>
            <Input
              inputRef={usernameRef}
              sx={{ width: '100%' }}
              id='input-with-icon-adornment'
              placeholder='Type your username'
              defaultValue='helloworld123'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ width: '80%', margin: '0 0 40px 0' }} variant='standard'>
            <InputLabel htmlFor='input-with-icon-password'>Password</InputLabel>
            <Input
              inputRef={passwordRef}
              sx={{ width: '100%' }}
              id='input-with-icon-password'
              placeholder='Type your password'
              defaultValue='helloworld34242'
              startAdornment={
                <InputAdornment position='start'>
                  <KeyIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <Button sx={{ margin: '0 0 230px 0' }} onClick={handleLogin} variant='contained'>
            Login
          </Button>
        </>
      ) : (
        <>
          <span className={cx('faceid-description')}>Check your face to login</span>
          <Capture onCaptured={handleLoginWithFaceId} />
        </>
      )}
      <div className={cx('div-horizon')}></div>

      <footer className={cx('footer-signup')}>
        <p>
          Don&apos;t have an account?{' '}
          <button className={cx('button-signup')} onClick={handleNavigateRegister}>
            Sign up
          </button>
        </p>
      </footer>
    </div>
  )
}

export default LoginForm
