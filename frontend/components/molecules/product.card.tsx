import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'

import { URLS } from '../../config/constants'
import { formatAmountForDisplay } from '../../utils/stripe-helpers'

import type CGCommerce from '../../utils/types'

type Props = {
  data: CGCommerce.Product
}

/**
 * Displays a Product Card. Uses the first image from the images as the display image.
 * @param data The data of the Product
 */
const ProductCard: React.FC<Props> = ({ data }) => {
  const name = data.display_name || data.name?.toLowerCase()
  const img = data.images[0]

  const styles = useStyles()
  return (
    <Link href={`/catalog/product/${data.id}`}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <Image
            src={`${URLS.API}${img.url}`}
            alt={`Picture of ${name}`}
            width={383}
            height={601}
            quality={100}
          />
          <div className={styles.productInfoContainer}>
            <Typography variant='h6' className={styles.productInfoName}>
              {name}
            </Typography>
            <Typography variant='h6'>{formatAmountForDisplay(data.unit_amount, 'CAD')}</Typography>
          </div>
        </div>
      </div>
    </Link>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 320,
    [theme.breakpoints.down('sm')]: {
      width: 283,
    },
  },
  imgContainer: {
    width: '100%',
  },
  productInfoContainer: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  productInfoName: {
    lineHeight: '50%',
  },
}))

export default React.memo(ProductCard)
