import { useState } from 'react'

import styles from './sidebar.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

import List from '@mui/material/List'

import MyListItem from '~/components/components/ListItem'

// import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
// import { setAuth } from '~/service/redux/slice/authSlice'

import listSideBar from './listSidebar'

const cx = classNames.bind(styles)

function Sidebar() {
  // const auth = useAppSelector((state) => state.auth)
  // const dispatch = useAppDispatch()

  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const changeStateSidebar = () => {
    setOpen((prev) => !prev)
  }

  const handleListItemClick = (index: number, link: string) => {
    setSelectedIndex(index)
    navigate(link)
  }

  return (
    <div className={open ? cx('sidebar') : cx('sidebar_hide')}>
      <div className={cx('button-open-close')}>
        <IconButton onClick={changeStateSidebar}>
          <MenuIcon />
        </IconButton>
      </div>
      <List sx={{ marginTop: 10, borderTop: '1px solid #fff' }}>
        {listSideBar.map((item) => (
          <MyListItem
            key={'sidebar' + item.index}
            icon={item.icon}
            text={item.name}
            handleClick={() => handleListItemClick(item.index, item.link)}
            selected={selectedIndex === item.index}
          />
        ))}
      </List>
    </div>
  )
}

export default Sidebar
