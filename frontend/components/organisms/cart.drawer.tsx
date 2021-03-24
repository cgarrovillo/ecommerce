import React, { useEffect } from 'react'
import { IconButton, makeStyles, useMediaQuery, Badge, Drawer } from '@material-ui/core'
import { BsBag, BsBagFill } from 'react-icons/bs'
import { useShoppingCart } from 'use-shopping-cart'

import CartDrawerContent from '../templates/cart-drawer-content'

type ToggleEvent = React.KeyboardEvent | React.MouseEvent
// When the viewport is less than 600px (mobile), the button leads to a full page view of the cart.
// On desktop, hover shows a side drawer.

/**
 * Component containing the UI related to use-shopping-cart.
 * This includes the cart icon button with the badge, & the "drawer" sidebar of the cart.
 * @returns
 */
const CartDrawer: React.FC = () => {
  const { cartCount, cartDetails, totalPrice } = useShoppingCart()
  const styles = useStyles()

  const isMobile = useMediaQuery('(max-width:600px)')
  const iconSize = isMobile ? '0.85em' : '0.9em'

  const [state, setState] = React.useState(false)

  const toggleDrawer = (event: ToggleEvent) => {
    // If called wwhen event was a keyboard event, just return fast
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    // Only open if not on mobile
    setState(!state)
  }

  useEffect(() => {
    console.log('parent draw')
  }, [])

  return (
    <>
      <IconButton className={styles.button} aria-label='add to bag' onClick={toggleDrawer}>
        <Badge badgeContent={cartCount} color='primary'>
          {state ? <BsBagFill size={iconSize} /> : <BsBag size={iconSize} />}
          {/* <BsBag size={iconSize} fill='blue' /> */}
        </Badge>
      </IconButton>
      <Drawer
        classes={{
          paper: styles.drawerPaper,
          modal: styles.drawerModal,
        }}
        anchor='right'
        open={state}
        onClose={toggleDrawer}>
        <div className={styles.offset} />
        <CartDrawerContent cartDetails={cartDetails} totalPrice={totalPrice} />
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
