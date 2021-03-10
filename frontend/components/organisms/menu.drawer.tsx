import React, { useCallback } from 'react'
import { IconButton, makeStyles, SwipeableDrawer, List, ListItem } from '@material-ui/core'
import { FiMenu } from 'react-icons/fi'

import NavLink from '../atoms/navbar.link'

type Anchor = 'left' | 'right'
type ToggleEvent = React.KeyboardEvent | React.MouseEvent

// TODO: onClick "ripple" effect of MaterialUI is too slow.
const MenuDrawer: React.FC = () => {
  const styles = useStyles()

  const [state, setState] = React.useState({
    left: false,
    right: false,
  })

  const toggleDrawer = useCallback(
    (anchor: Anchor, open: boolean) => (event: ToggleEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    },
    [state]
  )

  return (
    <>
      <IconButton
        className={styles.button}
        aria-label='add to bag'
        onClick={toggleDrawer('right', true)}>
        <FiMenu />
      </IconButton>
      <SwipeableDrawer
        anchor='bottom'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}>
        <List className={styles.drawerList}>
          <ListItem>
            <NavLink href='/collections'>Sign in</NavLink>
          </ListItem>
          <ListItem>
            <NavLink href='/collections'>Get help</NavLink>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    cursor: 'pointer',

    margin: '0 1em',
  },
  button: {
    color: theme.palette.text.primary,
  },
  drawerList: {
    width: '75vw',
  },
}))

export default MenuDrawer
