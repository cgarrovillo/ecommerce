import React from 'react'
import { Container, Grid, makeStyles, Typography, Divider } from '@material-ui/core'
import { useShoppingCart } from 'use-shopping-cart'

import Layout from '../components/Layout'
import CartItem from '../components/molecules/cart-item.card'
import { formatAmountForDisplayDecimal } from '../utils/stripe-helpers'
import CheckoutButton from '../components/atoms/checkout.button'

const CartPage = () => {
  const styles = useStyles()

  const { cartDetails, formattedTotalPrice, totalPrice } = useShoppingCart()
  const cart = Object.values(cartDetails)

  return (
    <Layout>
      <Container>
        <div>
          <Typography>Act fast</Typography>
        </div>

        <Grid container>
          <Grid item xs={12} sm={8}>
            <div>
              {cart.map((item: any, i: number) => (
                <>
                  <CartItem item={item} key={item.id} />
                  {i > 1 && <Divider />}
                </>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              <div className={styles.subtotalContainer}>
                <Typography component='span'>Subtotal</Typography>
                <Typography component='span'>
                  {formatAmountForDisplayDecimal(totalPrice, 'CAD')}
                </Typography>
              </div>
              <div className={styles.ctaContainer}>
                <CheckoutButton />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
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

export default CartPage
