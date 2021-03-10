import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  IconButton,
  makeStyles,
  SwipeableDrawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  Badge,
  Toolbar,
  Drawer,
} from '@material-ui/core'
import { BsBag, BsBagFill } from 'react-icons/bs'
import { useShoppingCart } from 'use-shopping-cart'

import NavLink from '../atoms/navbar.link'
import CartDrawerContent from '../templates/cart'

type ToggleEvent = React.KeyboardEvent | React.MouseEvent
// TODO: useShoppingCart , wrap in materialui Badge, put shopping cart drawer logic in here
// When the viewport is less than 600px (mobile), the button leads to a full page view of the cart.
// On desktop, hover shows a side drawer.
const CartDrawer: React.FC = () => {
  const { cartCount } = useShoppingCart()
  const router = useRouter()
  const styles = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const iconSize = isMobile ? '0.85em' : '0.9em'

  const [state, setState] = React.useState(false)

  const goToCart = useCallback(() => {
    router.push('/cart')
  }, [])

  const toggleDrawer = useCallback(
    (open: boolean) => (event: ToggleEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      if (open) {
        setTimeout(() => setState(open), 100)
      } else {
        setState(open)
      }
    },
    [state]
  )

  return (
    <>
      <IconButton
        className={styles.button}
        aria-label='add to bag'
        onClick={goToCart}
        onMouseEnter={toggleDrawer(true)}>
        <Badge badgeContent={cartCount} color='primary'>
          {state ? <BsBagFill size={iconSize} /> : <BsBag size={iconSize} />}
        </Badge>
      </IconButton>
      <Drawer
        classes={{
          paper: styles.drawerPaper,
          modal: styles.drawerModal,
        }}
        PaperProps={
          {
            // onMouseLeave: toggleDrawer(false),
          }
        }
        anchor='right'
        open={state}
        onClose={toggleDrawer(false)}
        transitionDuration={{
          appear: 0,
        }}>
        <div className={styles.offset} />
        <CartDrawerContent />
      </Drawer>
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
  offset: theme.mixins.toolbar,
  drawerPaper: {
    width: 500,
    flexShrink: 0,
  },
  drawerModal: {
    zIndex: `${theme.zIndex.appBar - 1} !important` as any,
  },
  drawerList: {},
}))

export default CartDrawer
