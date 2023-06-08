import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
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
      <Tooltip title={props.text}>
        <ListItemIcon>
          <Icon
            sx={{
              color: props.colorInput || '#000'
            }}
          />
        </ListItemIcon>
      </Tooltip>
      <p style={textProps}>{props.text}</p>
    </ListItem>
  )
}
