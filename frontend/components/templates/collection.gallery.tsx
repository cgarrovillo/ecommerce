import React from 'react'
import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

import useCollection from '../../hooks/useCollection'
import ProductCard from '../molecules/product.card'

SwiperCore.use([Mousewheel])

type Props = {
  collection: string
  title: string
}

/**
 * Displays all Stripe products with the collection metadata.
 * @param collection The collection value, taken from Product metadata
 * @param title The display title for this collection
 */
const Collection: React.FC<Props> = ({ collection, title }) => {
  const { collectionData, isLoading, isError } = useCollection(collection)

  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const mouseWheel = isMobile
    ? false
    : {
        forceToAxis: true,
      }

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12}>
        <Typography variant='h2' className={styles.title}>
          {title}
        </Typography>
      </Grid>

      <div className={styles.swiperContainer}>
        {/* Settings to stop annoying behaviour. */}
        <Swiper
          className={styles.swiper}
          freeMode
          touchAngle={65}
          preloadImages={false}
          updateOnImagesReady={false}
          updateOnWindowResize={false}
          mousewheel={mouseWheel}>
          {collectionData?.map(data => (
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
  swiperContainer: {
    paddingLeft: '4em',
    paddingRight: '4em',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
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
