import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

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
      borderLeft: props?.selected ? '2px solid #2564cf' : '2px solid #fff',
      height: 60
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
      <ListItemIcon>
        <Icon
          sx={{
            color: props.colorInput || '#000'
          }}
        />
      </ListItemIcon>
      <p style={textProps}>{props.text}</p>
    </ListItem>
  )
}
