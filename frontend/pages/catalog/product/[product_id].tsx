import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Stripe from 'stripe'

import Layout from '../../../components/Layout'

import { Typography, makeStyles } from '@material-ui/core'
import useProduct from '../../../hooks/useProduct'

const Product: NextPage = () => {
  const router = useRouter()
  const { product_id } = router.query

  const { product, isLoading, isError } = useProduct(product_id!)

  const styles = useStyles()

  if (isLoading) return <Layout>Loading...</Layout>

  return <Layout>{product && product.id}</Layout>
}

const useStyles = makeStyles(theme => ({
  bannerText: {
    textShadow: '0px 4px 16px  rgba(0,0,0,0.2)',
    [theme.breakpoints.down('xs')]: {
      textShadow: '0px 4px 16px  rgba(0,0,0,0.4)',
    },
  },
}))

export default Product
