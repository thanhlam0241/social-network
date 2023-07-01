import { useAppSelector } from '~/hooks/storeHook'

import { useState } from 'react'

import { Snackbar, Alert } from '@mui/material'

function Home() {
  const auth = useAppSelector((state) => state.auth)
  const [success, setSuccess] = useState(true)
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSuccess(false)
  }
  return (
    <main style={{ textAlign: 'center', height: 800, padding: 200 }}>
      <h1>
        Hello <span style={{ color: 'red' }}>{auth?.username}</span>
      </h1>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          Login successfully
        </Alert>
      </Snackbar>
    </main>
  )
}

export default Home
