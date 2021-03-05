import React, { useMemo, useCallback } from 'react'
import {
  makeStyles,
  Toolbar,
  Box,
  Button,
  SwipeableDrawer,
  ListItem,
  List,
} from '@material-ui/core'
import Link from 'next/link'

import HeaderButton from '../atoms/header.button'
import Logo from '../atoms/logo'

const CollapsibleToolbar = ({ children }: any) => {
  const styles = useStyles()
  const iOS = useMemo(() => {
    if (typeof window !== 'undefined') {
      return /iPad|iPhone|iPod/.test(navigator.userAgent)
    }
  }, [])
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
    <Toolbar className={styles.toolbar}>
      {/* Mobile Only */}
      <Button onClick={toggleDrawer('left', true)} className={styles.mobileToggle}>
        Shop
      </Button>
      <SwipeableDrawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        disableBackdropTransition={!iOS} // Helper for low-end devices
        disableDiscovery={iOS} // Helper for iOS devices, due to the "swipe to go back" feature
      >
        <List className={styles.drawerList}>
          <ListItem>
            <HeaderButton label='Shop All' href='/catalog' />
          </ListItem>
          <ListItem>
            <HeaderButton label='Collections' href='/collections' />
          </ListItem>
        </List>
      </SwipeableDrawer>
      {/* End */}

      {/* ============= DESKTOP ============= */}
      <div>
        <HeaderButton label='Shop All' href='/catalog' />
        <HeaderButton label='Collections' href='/collections' />
      </div>

      <Box className={styles.logoContainer}>
        <Logo />
      </Box>

      <div>
        <HeaderButton label='Cart' href='/collections' />
        <HeaderButton label='Account' href='/collections' />
      </div>

      {/* ============= END DESKTOP ============= */}

      {/* Mobile Only */}
      <Button onClick={toggleDrawer('right', true)} className={styles.mobileToggle}>
        Cart
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}>
        <List className={styles.drawerList}>
          <ListItem>
            <HeaderButton label='Cart' href='/collections' />
          </ListItem>
          <ListItem>
            <HeaderButton label='Account' href='/collections' />
          </ListItem>
        </List>
      </SwipeableDrawer>
      {/* End */}
    </Toolbar>
  )
}

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  toolbar: {
    justifyContent: 'space-between',
  },
  logoContainer: {},
  mobileToggle: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    textTransform: 'none',
  },
  drawerList: {
    width: '75vw',
  },
}))

type Anchor = 'left' | 'right'
type ToggleEvent = React.KeyboardEvent | React.MouseEvent

export default CollapsibleToolbar
