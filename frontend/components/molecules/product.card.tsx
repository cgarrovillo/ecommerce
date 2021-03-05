import React from 'react'
import type Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'

import { formatAmountForDisplay } from '../../utils/stripe-helpers'

type Props = {
  price: Stripe.Price
}

/**
 * Displays a Product Card. Uses the first image from the Stripe.Product.Images[] as the display image.
 * @param price The Stripe.Price containing a Stripe.Product to display
 */
const ProductCard: React.FC<Props> = ({ price }) => {
  const product = price.product as Stripe.Product
  const name = product.name?.toLowerCase()
  const img = product.images[0]

  const styles = useStyles()
  return (
    <Link href={`/catalog/product/${product.id}`}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <Image
            src={img}
            alt={`Picture of ${name}`}
            width={383}
            height={601}
            layout='responsive'
            quality={100}
          />
          <div className={styles.productInfoContainer}>
            <Typography variant='h6' className={styles.productInfoName}>
              {name}
            </Typography>
            <Typography variant='h6'>
              {formatAmountForDisplay(price.unit_amount!, 'CAD')}
            </Typography>
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
