import { useState, useRef } from 'react'

import className from 'classnames/bind'
import styles from './header.module.scss'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'

import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import reactIcon from '~/assets/icons/react2.png'

const cx = className.bind(styles)

function Header() {
  const searchBar = useRef(null)
  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  const clearSearch = () => {
    setSearch('')
  }
  return (
    <div className={cx('header-main')}>
      <div>
        <img style={{ width: 40 }} src={reactIcon} alt='hello' />
      </div>
      <div className={cx('search')}>
        <input ref={searchBar} value={search} onChange={handleSearch} placeholder='Tìm kiếm' spellCheck={false} />
        <div className={cx('clear')}>
          {search.length > 0 && (
            <button style={{ backgroundColor: 'transparent' }} onClick={clearSearch}>
              <ClearIcon />
            </button>
          )}
        </div>
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
      <div>
        <Avatar>OP</Avatar>
      </div>
    </div>
  )
}

export default Header
