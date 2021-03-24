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
              <CartDrawer />
              <UserAccountButton />
            </div>
          </div>

          {/* ============= END DESKTOP ============= */}

          {/* Mobile Only */}
          <div className={styles.mobileOnly}>
            <MenuDrawer />

            <CartDrawer />
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
  appBar: {
    boxShadow: 'none',
  },
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
}))

export default React.memo(NavBar)
