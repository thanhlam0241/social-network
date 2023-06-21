import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useRef } from 'react'

interface Props {
  onSend?: any
  open: boolean
  handleClose?: any
}

export default function FormDialog({ onSend, open, handleClose }: Props) {
  const messageRef = useRef<HTMLInputElement>(null)
  const sendFriendRequest = () => {
    const message = messageRef.current?.value || ''
    onSend(message)
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your message of the friend request and click to Send button</DialogContentText>
          <TextField
            inputRef={messageRef}
            margin='dense'
            id='name'
            label='Message'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendFriendRequest}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
