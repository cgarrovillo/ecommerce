import type Stripe from 'stripe'
import React, { useCallback } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import { createCheckoutSession } from '../../utils/api-helpers'
import getStripe from '../../utils/get-stripejs'

interface Props {
  price?: Stripe.Price
}

/**
 * Renders a button to initiate checkout when there is no price attribute.
 * If a price attribute is present, renders an 'Add to Bag & Checkout' button, which does what it says.
 * @param price An attribute containing a Price object.
 * @returns
 */
const CheckoutButton: React.FC<Props> = ({ price }) => {
  const styles = useStyles()
  const { cartDetails, cartCount } = useShoppingCart()

  const handleCheckout = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault()
      if (!event?.isTrusted || cartCount < 1) {
        return
      }

      const stripe = await getStripe()
      const session_id = await createCheckoutSession(cartDetails)

      stripe?.redirectToCheckout({
        sessionId: session_id,
      })
    },
    [price]
  )

  return (
    <div>
      <Button className={styles.link} onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  link: {
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
