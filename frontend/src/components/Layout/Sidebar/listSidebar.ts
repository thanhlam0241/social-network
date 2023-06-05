import HomeIcon from '@mui/icons-material/Home'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ForumIcon from '@mui/icons-material/Forum'

const listSideBar = [
  {
    index: 0,
    name: 'Home',
    link: '/',
    icon: HomeIcon
  },
  {
    index: 1,
    name: 'Todo list',
    link: '/todo',
    icon: PlaylistAddCheckIcon
  },
  {
    index: 2,
    name: 'Chat',
    link: '/chat',
    icon: ForumIcon
  }
]

export default listSideBar
