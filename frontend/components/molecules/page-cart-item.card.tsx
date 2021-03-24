import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles, IconButton, Grid } from '@material-ui/core'
import { CartEntry, useShoppingCart } from 'use-shopping-cart'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = {
  item: CartEntry
}

/**
 * Displays a Product Card. Uses the first image from the Stripe.Product.Images[] as the display image.
 * @param price The Stripe.Price containing a Stripe.Product to display
 */
const PageCartItem: React.FC<Props> = ({ item }) => {
  const { incrementItem, decrementItem } = useShoppingCart()
  const styles = useStyles()

  const increment = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    if (!event.isTrusted) {
      return
    }
    incrementItem(item.sku)
  }, [])

  const decrement = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    if (!event.isTrusted) {
      return
    }
    decrementItem(item.sku)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <Link href={`/catalog/product/${item.product_data.id}`}>
          <>
            <Image
              src={item.image!}
              alt={`a picture of ${item.name}`}
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
            <Typography variant='h5'>{item.name}</Typography>
            <Typography variant='body2'>{item.formattedValue}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            No size
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <IconButton
                color='primary'
                size='small'
                className={styles.iconButton}
                onClick={decrement}>
                <AiOutlineMinus />
              </IconButton>
              <Typography variant='body2' component='span'>
                {item.quantity}
              </Typography>
              <IconButton
                color='primary'
                size='small'
                className={styles.iconButton}
                onClick={increment}>
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
