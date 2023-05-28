import ListConversation from '~/components/components/ChatComponent/ListConversation/ListConversation'
import ChatBox from '~/components/components/ChatComponent/ChatBox/Chatbox'
import { Box } from '@mui/material'
const Chat = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <ListConversation />
      <ChatBox />
    </Box>
  )
}

export default Chat
