import React from 'react'
import { makeStyles, AppBar, Toolbar } from '@material-ui/core'

import Logo from '../atoms/logo'
import NavLink from '../atoms/navbar.link'
import MenuDrawer from './menu.drawer'
import CartDrawer from './cart.drawer'
import UserAccountButton from '../atoms/signIn.button'

const NavBar = () => {
  const styles = useStyles()

  return (
    <>
      <AppBar className={styles.appBar} color='secondary'>
        <Toolbar className={styles.toolbar}>
          <div className={styles.toolbarInner}>
            <div className={styles.desktopOnly}>
              <NavLink href='/catalog'>Shop All</NavLink>
              <NavLink href='/collections'>Collections</NavLink>
            </div>

            <div>
              <Logo />
            </div>

            <div className={styles.actionButtons}>
              <CartDrawer />
              <div className={styles.desktopOnly}>
                <UserAccountButton />
              </div>

              <div className={styles.mobileOnly}>
                <MenuDrawer />
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Offset Appbar So nothing is behind the Appbar*/}
      <div className={styles.offset} />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: 'none',
  },
  offset: theme.mixins.toolbar,
  toolbar: {
    justifyContent: 'space-between',
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
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
  },
  toolbarInner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    textTransform: 'none',
  },
}))

export default React.memo(NavBar)
