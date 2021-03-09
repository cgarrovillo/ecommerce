import type Stripe from 'stripe'
import React, { useCallback } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import { CURRENCY } from '../../config/constants'

interface Props {
  label: string
  price: Stripe.Price
}

const BuyButton: React.FC<Props> = ({ label, price }) => {
  const styles = useStyles()
  const { addItem } = useShoppingCart()

  const product = price?.product as Stripe.Product

  // TODO: onClick, Form price object using the passed in price object, then add item to cart
  const addToBag = useCallback(
    event => {
      if (!event?.isTrusted) {
        return
      }

      const item = {
        name: product.name,
        descsription: product?.description,
        id: product.id,
        price: price.unit_amount,
        currency: CURRENCY,
        image: product?.images[0],
      }

      // @ts-ignore
      addItem(item)
    },
    [price]
  )

  return (
    <Box className={styles.container}>
      <Button className={styles.link} onClick={addToBag}>
        {label}
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

export default BuyButton
