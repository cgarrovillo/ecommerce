import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Divider, makeStyles, Typography } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import CartItem from '../molecules/cart-item.card'
import { formatAmountForDisplayDecimal } from '../../utils/stripe-helpers'

const CartDrawerContent = () => {
  const styles = useStyles()
  const router = useRouter()

  const { cartDetails, formattedTotalPrice, totalPrice } = useShoppingCart()
  const cart = Object.values(cartDetails)

  const goToCart = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    router.push('/cart')
  }, [])
  return (
    <>
      <Container className={styles.root}>
        <div className={styles.cartItemsContainer}>
          {cart.map((item: any, i: number) => (
            <>
              <CartItem item={item} key={item.id} simple />
              {i > 1 && <Divider />}
            </>
          ))}
        </div>
        <div>
          <div className={styles.subtotalContainer}>
            <Typography component='span'>Subtotal</Typography>
            <Typography component='span'>
              {formatAmountForDisplayDecimal(totalPrice, 'CAD')}
            </Typography>
          </div>
          <div className={styles.ctaContainer}>
            <Button className={styles.link} onClick={goToCart}>
              View Bag
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: '1em 1.5em 2em 1.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cartItemsContainer: {
    height: '100%',
  },
  link: {
    display: 'block',
    width: 'calc(100% - 2em)',
    margin: '0 1em',
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
  subtotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em 0',
  },
  ctaContainer: {
    position: 'relative',
    bottom: 0,
  },
}))

export default CartDrawerContent
