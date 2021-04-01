import React, { useCallback } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'

import { useShoppingBag } from '../../utils/usb/BagContext'
import type CGCommerce from '../../utils/types/index'

interface Props {
  children: string
  product: CGCommerce.Product
}

const BuyButton: React.FC<Props> = ({ children, product }) => {
  const styles = useStyles()
  const { addProduct } = useShoppingBag()

  const addToBag = useCallback(
    (event) => {
      if (!event?.isTrusted) {
        return
      }

      addProduct({
        id: product.stripe_id,
        unit_amount: product.unit_amount,
        quantity: 1,
        data: product,
      })
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

const useStyles = makeStyles((theme) => ({
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
