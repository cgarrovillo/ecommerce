import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Image from 'next/image'

import Layout from '../../../components/Layout'
import Breadcrumbs from '../../../components/atoms/breadcrumbs'
import BuyButton from '../../../components/atoms/addToBag.button'

import { Typography, makeStyles, Grid, Container } from '@material-ui/core'
import { formatAmountForDisplay } from '../../../utils/stripe-helpers'
import { getAllProducts, getProduct } from '../../../utils/api-helpers'
import { URLS } from '../../../config/constants'

import type CGCommerce from '../../../utils/types/index'

SwiperCore.use([Pagination])

// Since this is a dynamic route. This is necessary for getStaticProps to actually pre-render the page.
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: CGCommerce.Product[] = await getAllProducts()
  const paths = allProducts.map(prod => ({
    // This is used by the context parameter in getStaticProps()
    params: { product_id: prod.id },
  }))

  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  return { paths, fallback: false }
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps = async context => {
  const product: CGCommerce.Product = await getProduct(`${context?.params?.product_id}`)
  return { props: { product } }
}

/**
 * SSG Rendered Product page using a fetched Price object from Stripe.
 * For SSG to work on this dynamic route, getStaticPaths is used to determine the different kinds of products we have.
 * getStaticPROPS is then used to actually fetch more data about that product object, which is then consumed by the page itself.
 * @returns
 */
const Product = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  const images = [
    // FOR TESTING ONLY
    product.images[0],
    product.images[0],
    product.images[0],
    product.images[0],
    product.images[0],
  ]

  const unitAmount = formatAmountForDisplay(product.unit_amount)

  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const swiperDirection = isMobile ? 'horizontal' : 'vertical'
  const swiperSlideWidth = isMobile ? '100%' : '560'
  const swiperSlideHeight = isMobile ? '100%' : '790'

  if (router.isFallback) return <Layout>Loading Product...</Layout>
  if (router.isFallback && !product) return <Layout>Error</Layout>

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
                        src={`${URLS.API}${imgUrl.url}`}
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
                <BuyButton product={product}>Add to Bag</BuyButton>
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
    margin: '4.5em 0 3em 0',

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
