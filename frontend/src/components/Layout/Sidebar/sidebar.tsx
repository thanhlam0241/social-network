import { useState } from 'react'
import authenticateApi from '~/service/api/authenticate/authenticateApi'
import styles from './sidebar.module.scss'
import classNames from 'classnames/bind'

import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

import List from '@mui/material/List'
import InboxIcon from '@mui/icons-material/Inbox'
import { Button } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'

import MyListItem from '~/components/components/ListItem'

import useAuth from '~/hooks/useAuth'
import Cookies from 'js-cookie'

const cx = classNames.bind(styles)

function Sidebar() {
  const { auth, setAuth } = useAuth()
  const [open, setOpen] = useState(true)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const changeStateSidebar = () => {
    setOpen((prev) => !prev)
  }

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleLogout = async () => {
    if (auth?.token && setAuth) {
      await authenticateApi.Logout(auth.token)
      Cookies.remove('atk')
      Cookies.remove('rtk')
      setAuth({ token: '', username: '', role: '' })
    }
  }

  return (
    <div className={open ? cx('sidebar') : cx('sidebar_hide')}>
      <div className={cx('button-open-close')}>
        <IconButton onClick={changeStateSidebar}>
          <MenuIcon />
        </IconButton>
      </div>
      <List sx={{ marginTop: 10, borderTop: '1px solid #fff' }}>
        <MyListItem
          icon={AssignmentIcon}
          text='Task 1'
          handleClick={() => handleListItemClick(0)}
          selected={selectedIndex === 0}
        />
        <MyListItem
          icon={AssignmentIcon}
          text='Task 2'
          handleClick={() => handleListItemClick(1)}
          selected={selectedIndex === 1}
        />
      </List>
      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Sidebar
