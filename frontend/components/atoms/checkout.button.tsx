import React, { useCallback } from 'react'
import { makeStyles, Button } from '@material-ui/core'

import { useShoppingBag } from '../../utils/usb/BagContext'
import { createCheckoutSession } from '../../utils/api-helpers'
import getStripe from '../../utils/get-stripejs'

/**
 * Renders a button to initiate checkout when there is no price attribute.
 * If a price attribute is present, renders an 'Add to Bag & Checkout' button, which does what it says.
 * @param price An attribute containing a Price object.
 * @returns
 */
const CheckoutButton: React.FC<any> = () => {
  const styles = useStyles()
  const { cartItems, itemCount } = useShoppingBag()

  const handleCheckout = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault()
      if (!event?.isTrusted || !itemCount || itemCount < 1) {
        return
      }

      const stripe = await getStripe()
      const session_id = await createCheckoutSession(cartItems)

      stripe?.redirectToCheckout({
        sessionId: session_id,
      })
    },
    [cartItems]
  )

  return (
    <Button className={styles.link} onClick={handleCheckout}>
      Checkout
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    width: '100%',
    display: 'block',
    padding: '0.5em 4em',
    borderRadius: 0,

    fontSize: '1.3rem',
    textTransform: 'none',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

export default CheckoutButton
