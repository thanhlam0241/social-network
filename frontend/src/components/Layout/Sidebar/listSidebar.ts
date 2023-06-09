import HomeIcon from '@mui/icons-material/Home'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ForumIcon from '@mui/icons-material/Forum'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'

const listSideBar = [
  {
    index: 0,
    name: 'Home',
    link: '/',
    icon: HomeIcon
  },
  {
    index: 1,
    name: 'Profile',
    link: '/profile',
    icon: PersonIcon
  },
  {
    index: 2,
    name: 'Friends',
    link: '/friends',
    icon: PeopleIcon
  },
  {
    index: 3,
    name: 'Todo list',
    link: '/todo',
    icon: PlaylistAddCheckIcon
  },
  {
    index: 4,
    name: 'Chat',
    link: '/chat',
    icon: ForumIcon
  }
]

export default listSideBar
