import React, { useState } from 'react'
import { IconButton, makeStyles, Drawer } from '@material-ui/core'

import CartIconWithBadge from '../atoms/cartWithBadge.button'

import { useShoppingBag } from '../../utils/usb/BagContext'
import CartDrawerContent from '../templates/cart-drawer-content'

type ToggleEvent = React.KeyboardEvent | React.MouseEvent

/**
 * Component containing the UI related to the shopping bag
 * This includes the cart icon button with the badge, & the "drawer" sidebar of the cart.
 * @returns
 */
const CartDrawer: React.FC = () => {
  const { cartItems, total } = useShoppingBag()
  const styles = useStyles()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = (event: ToggleEvent) => {
    // If called when event was a keyboard event, just return fast
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <>
      <IconButton className={styles.button} aria-label='add to bag' onClick={toggleDrawer}>
        <CartIconWithBadge open={isDrawerOpen} />
      </IconButton>
      <Drawer
        classes={{
          paper: styles.drawerPaper,
          modal: styles.drawerModal,
        }}
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <div className={styles.offset} />
        <CartDrawerContent cartDetails={cartItems} totalPrice={total} />
      </Drawer>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
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

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  drawerModal: {
    zIndex: `${theme.zIndex.appBar - 1} !important` as any,
  },
  drawerList: {},
}))

export default React.memo(CartDrawer)
