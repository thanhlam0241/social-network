import styles from './Information.module.scss'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useNavigate, useLocation } from 'react-router'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function ProfileTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: '20px 20%' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const listTab = [
  { id: 0, name: 'Posts', link: '' },
  { id: 1, name: 'Introduction', link: '?sk=about' },
  { id: 2, name: 'Friend', link: '?sk=friends' },
  { id: 3, name: 'Images', link: '?sk=photos' },
  { id: 4, name: 'Videos', link: '?sk=videos' }
]

function Information() {
  const location = useLocation()

  const [value, setValue] = useState(() => {
    const tab = listTab.findIndex((item) => item.link === location.search)
    return tab === -1 ? 0 : tab
  })

  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            backgroundColor: '#fff',
            padding: '0 20%',
            '@media (max-width: 1080px)': {
              padding: '0 5%',
              fontSize: '0.6rem'
            },
            '@media (max-width: 680px)': {
              padding: '0',
              fontSize: '0.6rem'
            }
          }}
          aria-label='basic tabs example'
        >
          {listTab.map((item) => (
            <Tab
              key={'tab' + item.id}
              onClick={() => navigate(location.pathname + item.link)}
              label={item.name}
              {...a11yProps(item.id)}
            />
          ))}
          {/* <Tab onClick={() => navigate(location.pathname)} label='Posts' {...a11yProps(0)} />
          <Tab onClick={() => navigate(location.pathname + '?sk=about')} label='Introduction' {...a11yProps(1)} />
          <Tab onClick={() => navigate(location.pathname + '?sk=friends')} label='Friend' {...a11yProps(2)} />
          <Tab onClick={() => navigate(location.pathname + '?sk=photos')} label='Images' {...a11yProps(3)} />
          <Tab onClick={() => navigate(location.pathname + '?sk=videos')} label='Videos' {...a11yProps(4)} /> */}
          <Tab label='See more' {...a11yProps(5)} />
        </Tabs>
      </Box>
      {/* <ProfileTabPanel value={value} index={0}>
        Posts
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={1}>
        Introduction
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={2}>
        Friend
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={3}>
        Images
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={4}>
        Videos
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={5}>
        Reels
      </ProfileTabPanel>
      <ProfileTabPanel value={value} index={6}>
        See more
      </ProfileTabPanel> */}
    </Box>
  )
}

export default Information
