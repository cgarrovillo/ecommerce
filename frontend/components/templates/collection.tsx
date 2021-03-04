import React from 'react'
import useSWR from 'swr'
import Stripe from 'stripe'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Mousewheel])

import ProductCard from '../molecules/product.card'

type Props = {
  collection: string
  title: string
}

type APIResponse = {
  data?: Stripe.Price[] | undefined
  error?: any
}

/**
 * Displays all Stripe products with the collection metadata.
 * @param collection The collection value, taken from Product metadata
 * @param title The display title for this collection
 */
const Collection: React.FC<Props> = ({ collection, title }) => {
  const { data, error }: APIResponse = useSWR(`/api/collections/${collection}`)
  const styles = useStyles()

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12}>
        <Typography variant='h2' className={styles.title}>
          {title}
        </Typography>
      </Grid>

      <div>
        {/* Settings to stop annoying behaviour. */}
        <Swiper
          className={styles.swiper}
          freeMode
          touchAngle={65}
          preloadImages={false}
          updateOnImagesReady={false}
          updateOnWindowResize={false}
          mousewheel={{
            forceToAxis: true,
          }}>
          {data?.map(data => (
            <SwiperSlide key={data.id} className={styles.swiperSlide}>
              <ProductCard price={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    padding: '2em',
  },
  swiper: {
    padding: '1em',
  },
  swiperSlide: {
    width: 'max-content !important',
    marginRight: '16px',
  },
}))

export default Collection
