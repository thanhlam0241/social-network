import ListConversation from '~/components/components/ChatComponent/ListConversation/ListConversation'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Outlet, useLocation, useParams } from 'react-router-dom'

const Chat = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}
    >
      <ListConversation />
      {/* <ChatBox /> */}
      <Outlet />
    </Box>
  )
}

export default Chat
