import React, { useCallback } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import type CGCommerce from '../../utils/types/index'

interface Props {
  children: string
  product: CGCommerce.Product
}

const BuyButton: React.FC<Props> = ({ children, product }) => {
  const styles = useStyles()
  const { addItem } = useShoppingCart()

  const addToBag = useCallback(
    event => {
      if (!event?.isTrusted) {
        return
      }

      const item = {
        name: product.name,
        descsription: product.description,
        id: product.stripe_id,
        sku: product.stripe_id,
        price: product.unit_amount,
        currency: 'cad',
        image: product.images[0].url,
        product_data: product,
      }

      addItem(item)
    },
    [product]
  )

  return (
    <Box className={styles.container}>
      <Button className={styles.link} onClick={addToBag}>
        {children}
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
