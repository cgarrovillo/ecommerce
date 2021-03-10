import React from 'react'
import { makeStyles } from '@material-ui/core'

import Layout from '../components/Layout'
import CartContent from '../components/templates/cart'

const CartPage = () => {
  const styles = useStyles()

  return (
    <Layout>
      <CartContent />
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({}))

export default CartPage
