import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'

import styles from './listItem.module.scss'
import classNames from 'classnames/bind'
import { NONAME } from 'dns'

const cx = classNames.bind(styles)
interface ListItemProps {
  icon: any
  text: string
  colorInput?: string
  selected?: boolean
  handleClick?: any
}

export default function CustomizedListItem(props: ListItemProps) {
  const Icon = props.icon
  const handleClickChange = () => {
    if (props.handleClick) {
      props.handleClick()
    }
  }
  const itemProps = {
    selected: props?.selected || false,
    onClick: handleClickChange,
    sx: {
      '&:hover': !props?.selected && {
        cursor: 'pointer',
        background: '#e2e2e2 !important',
        borderLeft: '2px solid #e2e2e2'
      },
      borderLeft: props?.selected ? '5px solid #2564cf' : '5px solid #fff',
      height: 60,
      '@media (max-width: 680px)': {
        width: '60px',
        borderLeft: 'none',
        borderBottom: props?.selected ? '5px solid #2564cf' : '5px solid #fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        textAlign: 'center'
      }
    }
  }

  const textProps = {
    color: props.colorInput || '#000',
    fontSize: 17,
    fontFamily: 'Segoe,Segoe UI',
    fontWeight: props?.selected ? '600' : 'normal'
  }

  return (
    <ListItem {...itemProps}>
      <Tooltip title={props.text}>
        <ListItemIcon>
          <Icon
            sx={{
              color: props.colorInput || '#000',
              '@media (max-width: 680px)': {
                display: 'block',
                margin: '0 auto'
              }
            }}
          />
        </ListItemIcon>
      </Tooltip>
      <p className={cx('text-side-bar')} style={textProps}>
        {props.text}
      </p>
    </ListItem>
  )
}
