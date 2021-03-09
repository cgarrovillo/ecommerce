import React, { useMemo, useCallback } from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  SwipeableDrawer,
  ListItem,
  List,
} from '@material-ui/core'

import NavLink from '../atoms/navbar.link'
import CartButton from '../atoms/cart.button'
import Logo from '../atoms/logo'

const NavBar = () => {
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
    <>
      <AppBar color='secondary'>
        <Toolbar className={styles.toolbar}>
          {/* Mobile Only */}
          <div className={styles.mobileOnly}>
            <Logo />
          </div>
          {/* End */}

          {/* ============= DESKTOP ============= */}
          <div className={styles.desktopOnly}>
            <div>
              <NavLink href='/catalog'>Shop All</NavLink>
              <NavLink href='/collections'>Collections</NavLink>
            </div>

            <div>
              <Logo />
            </div>

            <div>
              <CartButton />
              <NavLink href='/collections'>Sign In</NavLink>
            </div>
          </div>

          {/* ============= END DESKTOP ============= */}

          {/* Mobile Only */}
          <div className={styles.mobileOnly}>
            <Button onClick={toggleDrawer('left', true)} className={styles.actionButton}>
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
                  <NavLink href='/catalog'>Shop All</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink href='/collections'>Collections</NavLink>
                </ListItem>
              </List>
            </SwipeableDrawer>

            <Button onClick={toggleDrawer('right', true)} className={styles.actionButton}>
              <CartButton />
            </Button>
            <SwipeableDrawer
              anchor='right'
              open={state['right']}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}>
              <List className={styles.drawerList}>
                <ListItem>
                  <NavLink href='/collections'>Cart</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink href='/collections'>Sign In</NavLink>
                </ListItem>
              </List>
            </SwipeableDrawer>
          </div>

          {/* End */}
        </Toolbar>
      </AppBar>

      {/* So nothing is behind the Appbar*/}
      <div className={styles.offset} />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  toolbar: {
    justifyContent: 'space-between',
  },
  mobileOnly: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  desktopOnly: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    textTransform: 'none',
  },
  drawerList: {
    width: '75vw',
  },
}))

type Anchor = 'left' | 'right'
type ToggleEvent = React.KeyboardEvent | React.MouseEvent

export default NavBar
