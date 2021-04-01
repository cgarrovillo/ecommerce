import React from 'react'
import { Container, Grid, makeStyles, Typography, Divider } from '@material-ui/core'

import Layout from '../components/Layout'
import PageCartItem from '../components/molecules/page-cart-item.card'
import { formatAmountForDisplayDecimal } from '../utils/stripe-helpers'
import CheckoutButton from '../components/atoms/checkout.button'

import { useShoppingBag } from '../utils/usb/BagContext'

const CartPage = () => {
  const styles = useStyles()

  const { itemCount, cartItems, total } = useShoppingBag()
  const cart = Object.values(cartItems)

  return (
    <Layout>
      <Container className={styles.root}>
        <div className={styles.headerContainer}>
          <div>
            <Typography variant='h5' component='span'>
              My bag
            </Typography>
            <Typography variant='body1' component='span'>
              {itemCount > 1 ? `${itemCount} items` : `${itemCount} item`}
            </Typography>
          </div>
          <Divider />
        </div>

        <Grid container>
          <Grid item xs={12} md={9}>
            <div>
              {cart.map((item: any) => (
                <div key={item.id}>
                  <PageCartItem item={item} />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              <div className={styles.subtotalContainer}>
                <Typography component='span'>Subtotal</Typography>
                <Typography component='span'>{formatAmountForDisplayDecimal(total, 'CAD')}</Typography>
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em 3em',

    [theme.breakpoints.down('xs')]: {
      padding: '1.5em',
    },
  },
  headerContainer: {
    margin: '4em 0',

    '& div': {
      margin: '0.8em 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  },
  subtotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em 0',
  },
  ctaContainer: {},
}))

export default CartPage
