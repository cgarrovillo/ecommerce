import type Stripe from 'stripe'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Image from 'next/image'

import Layout from '../../../components/Layout'
import Breadcrumbs from '../../../components/atoms/breadcrumbs'
import BuyButton from '../../../components/atoms/buy.button'

import { Typography, makeStyles, Grid, Container } from '@material-ui/core'
import usePrice from '../../../hooks/usePrice'
import { formatAmountForDisplay } from '../../../utils/stripe-helpers'
import { axiosGet } from '../../../utils/api-helpers'

SwiperCore.use([Pagination])

// This is to optimize performance in useSWR, as the data returned from this can be passed on to {initialData}.
// See [Pre-rendering.](https://swr.vercel.app/docs/with-nextjs#pre-rendering)
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps = async context => {
  const prod: Stripe.Price = await axiosGet(`/api/prices/${context?.params?.product_id}`)

  return { props: { prod } }
}

// Since this is a dynamic route. This is necessary for getStaticProps to actually pre-render the page.
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: Stripe.Product[] = await axiosGet('/api/products')
  const paths = allProducts.map(prod => ({
    params: { product_id: prod.id },
  }))

  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  return { paths, fallback: true }
}

/**
 * Displays a Product Page when the query contains a valid Product.id
 * Takes advantage of Pre-rendering & live updates. See [Pre-rendering.](https://swr.vercel.app/docs/with-nextjs#pre-rendering)
 * @returns
 */
const Product = ({ price }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { product_id } = router.query
  // const { price, isError } = usePrice(product_id!, prod)

  const unitAmount = formatAmountForDisplay(price?.unit_amount!)
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

  if (router.isFallback) return <Layout>Loading...</Layout>
  if (router.isFallback && !price) return <Layout>Error</Layout>

  return (
    <Layout>
      <Container className={styles.root}>
        <Grid container spacing={0}>
          {/* Breadcrumbs & Images */}
          <Grid item xs={12} md={6} className={styles.leftTopContainer}>
            <div className={styles.breadcrumbContainer}>
              <Breadcrumbs name={product.name} />
            </div>

            <div className={styles.swiperContainer}>
              <Swiper
                direction={swiperDirection}
                freeMode
                touchAngle={65}
                updateOnImagesReady={false}
                updateOnWindowResize={false}
                nested={!isMobile}
                preloadImages={false}>
                {product.images.length > 0 &&
                  images.map((imgUrl, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                      <Image
                        src={imgUrl}
                        layout='responsive'
                        width={swiperSlideWidth}
                        height={swiperSlideHeight}
                        className={styles.img}
                        priority
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6} className={styles.rightBottomContainer}>
            <Grid container spacing={0} className={styles.productDetails}>
              <Grid item xs={12}>
                <Typography variant='h2'>{product && product.name.toLowerCase()}</Typography>
                <Typography variant='h5'>{product && unitAmount}</Typography>
              </Grid>

              <Grid item xs={12} className={styles.productDetailsSummary}>
                <Typography variant='h6'>100% cotton</Typography>
                <Typography variant='h6'>reinforced stitching on handles</Typography>
                <Typography variant='h6'>large interior</Typography>
              </Grid>

              <Grid item xs={12}>
                <BuyButton label='Add to Bag' />
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
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  leftTopContainer: {
    padding: '0 5em',

    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  breadcrumbContainer: {
    margin: '4.5em 0 1.5em 0',

    [theme.breakpoints.down('sm')]: {
      padding: '0 2em',
    },
  },
  swiperContainer: {
    alignSelf: 'flex-start',
  },
  swiperSlide: {
    height: 'max-content !important',
  },
  img: {
    objectFit: 'contain',
    display: 'inline',

    [theme.breakpoints.down('sm')]: {
      objectFit: 'contain',
    },
  },
  rightBottomContainer: {
    position: 'sticky',
    top: 0,
    height: 'max-content',
    alignSelf: 'flex-start',
    padding: '0 2em',
  },
  productDetails: {
    margin: '12em 0',

    [theme.breakpoints.down('sm')]: {
      margin: '4em 0',
    },
  },
  productDetailsSummary: {
    margin: '6em 0',
  },
}))

export default Product
