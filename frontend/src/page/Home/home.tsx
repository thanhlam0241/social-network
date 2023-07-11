import { useAppSelector } from '~/hooks/storeHook'
import { useAppDispatch } from '~/hooks/storeHook'
import { setAuth } from '~/service/redux/slice/authSlice'

import { useState, useEffect } from 'react'

import { Snackbar, Alert } from '@mui/material'

function Home() {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  console.log(auth)

  useEffect(() => {
    if (auth?.loginFirstTime) {
      setTimeout(() => dispatch(setAuth({ ...auth, loginFirstTime: false })), 3000)
    }
  }, [auth.loginFirstTime])

  return (
    <main style={{ textAlign: 'center', height: 800, padding: 200 }}>
      <h1>
        Hello <span style={{ color: 'red' }}>{auth?.username}</span>
      </h1>
      <Snackbar open={auth?.loginFirstTime} autoHideDuration={3000}>
        <Alert severity='success' sx={{ width: '100%' }}>
          Login successfully
        </Alert>
      </Snackbar>
    </main>
  )
}

export default Home
