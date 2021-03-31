import React from 'react'
import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

import ProductCard from '../molecules/product.card'
import swiperConfig from '../../config/swiper'

import type CGCommerce from '../../utils/types'

SwiperCore.use([Mousewheel])

type Props = {
  data: CGCommerce.ProductCollection
}

const Collection: React.FC<Props> = ({ data }) => {
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
          {data.display_name || data.name}
        </Typography>
      </Grid>

      <div className={styles.swiperContainer}>
        {/* Settings to stop annoying behaviour. */}
        <Swiper className={styles.swiper} mousewheel={mouseWheel} {...swiperConfig}>
          {data.products.map(product => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <ProductCard data={product} />
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
    width: '100vw',
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

export default React.memo(Collection)
