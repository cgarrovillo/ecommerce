import type Stripe from 'stripe'
import React, { useCallback } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import { createCheckoutSession } from '../../utils/api-helpers'
import getStripe from '../../utils/get-stripejs'

interface Props {
  price?: Stripe.Price
}

const CheckoutButton: React.FC<Props> = ({ price }) => {
  const styles = useStyles()
  const { cartDetails, cartCount } = useShoppingCart()

  const product = price?.product as Stripe.Product

  const addToBag = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault()
      if (!event?.isTrusted || cartCount < 1) {
        return
      }

      const stripe = await getStripe()
      const session_id = await createCheckoutSession(cartDetails)
      console.log(session_id)

      // TODO: stripe.redirecttocheckout
      stripe?.redirectToCheckout({
        sessionId: session_id,
      })
    },
    [price]
  )

  return (
    <Box className={styles.container}>
      <Button className={styles.link} onClick={addToBag}>
        Checkout
      </Button>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    display: 'inline-block',
  },
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
