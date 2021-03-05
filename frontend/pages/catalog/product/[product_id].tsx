import type Stripe from 'stripe'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Image from 'next/image'

import Layout from '../../../components/Layout'
import Breadcrumbs from '../../../components/atoms/breadcrumbs'

import { Typography, makeStyles, Grid, Container } from '@material-ui/core'
import usePrice from '../../../hooks/usePrice'

SwiperCore.use([Pagination])

const Product: NextPage = () => {
  const router = useRouter()
  const { product_id } = router.query
  const { price, isLoading, isError } = usePrice(product_id!)

  const product = price?.product as Stripe.Product
  const images = [
    product?.images[0],
    product?.images[0],
    product?.images[0],
    product?.images[0],
    product?.images[0],
  ]

  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const swiperDirection = isMobile ? 'horizontal' : 'vertical'
  const swiperSlideWidth = isMobile ? '100%' : '560'
  const swiperSlideHeight = isMobile ? '100%' : '790'

  if (isLoading) return <Layout>Loading...</Layout>

  return (
    <Layout>
      <Container className={styles.root}>
        <Grid container spacing={8} className={styles.allImagesContainer}>
          {/* Breadcrumbs & Images */}
          <Grid item xs={12} sm={6}>
            <div className={styles.breadcrumbContainer}>
              <Breadcrumbs name={product.name} />
            </div>

            <div className={styles.swiperContainer}>
              <Swiper
                direction={swiperDirection}
                freeMode
                pagination
                touchAngle={65}
                preloadImages={false}
                updateOnImagesReady={false}
                updateOnWindowResize={false}>
                {product.images.length > 0 &&
                  images.map((imgUrl, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                      <Image
                        src={imgUrl}
                        layout='responsive'
                        width={swiperSlideWidth}
                        height={swiperSlideHeight}
                        className={styles.img}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} sm={6} className={styles.productContainer}>
            <Grid container>
              <Grid item xs={12}>
                <div className={styles.productDetails}>
                  <Typography variant='h2'>{product && product.name.toLowerCase()}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 'max-content',
    overflow: 'visible',
  },
  allImagesContainer: {
    padding: '0 4em 0 4em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em 0 1em',
    },
  },
  breadcrumbContainer: {
    margin: '4.5em 0 1.5em 0',
  },
  swiperContainer: {
    overflow: 'hidden',
  },
  swiperSlide: {
    height: 'max-content !important',
  },
  img: {
    objectFit: 'contain',
    display: 'inline',

    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
    },
  },
  productContainer: {
    position: 'sticky',
    top: 0,
    height: 'auto',
    alignSelf: 'flex-start',
  },
  productDetails: {
    margin: '12em 0',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',

    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}))

export default Product
