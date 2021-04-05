import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles, IconButton, Grid } from '@material-ui/core'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { formatAmountForDisplayDecimal } from '../../utils/stripe-helpers'
import { imgUrl } from '../../utils/api-helpers'
import { useShoppingBag } from '../../utils/usb/BagContext'
import type { CartItem } from '../../utils/usb/types'

/**
 * Displays a Product Card. Uses the first image from the Stripe.Product.Images[] as the display image.
 * @param price The Stripe.Price containing a Stripe.Product to display
 */
const PageCartItem: React.FC<{ item: CartItem }> = ({ item }) => {
  const { increment, decrement } = useShoppingBag()
  const styles = useStyles()

  const incrementItem = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    if (!event.isTrusted) {
      return
    }
    increment(item)
  }, [])

  const decrementItem = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    if (!event.isTrusted) {
      return
    }
    decrement(item)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <Link href={`/catalog/product/${item.data.id}`}>
          <>
            <Image
              src={imgUrl(item.data.images[0].url)}
              alt={`a picture of ${item.data.name}`}
              width={189}
              height={258}
              quality={100}
            />
          </>
        </Link>
      </div>
      <div className={styles.detailsContainer}>
        <Grid container alignItems='center'>
          <Grid item xs={12} md={4}>
            <Typography variant='h5'>{item.data.name}</Typography>
            <Typography variant='body2'>{formatAmountForDisplayDecimal(item.data.unit_amount)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            No size
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <IconButton color='primary' size='small' className={styles.iconButton} onClick={decrementItem}>
                <AiOutlineMinus />
              </IconButton>
              <Typography variant='body2' component='span'>
                {item.quantity}
              </Typography>
              <IconButton color='primary' size='small' className={styles.iconButton} onClick={incrementItem}>
                <AiOutlinePlus />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
  link: {
    cursor: 'pointer',
  },
  detailsContainer: {
    padding: '1em 2em',
    width: 'calc(100% - 189px)',
  },

  hidden: {
    display: 'none',
  },

  iconButton: {
    margin: '0 0.5em',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}))

// Don't memoize
export default PageCartItem
