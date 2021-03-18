import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles, IconButton } from '@material-ui/core'
import { CartEntry, useShoppingCart } from 'use-shopping-cart'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = {
  item: CartEntry
  simple?: boolean
}

/**
 * Displays a Product Card. Uses the first image from the Stripe.Product.Images[] as the display image.
 * @param price The Stripe.Price containing a Stripe.Product to display
 */
const CartItem: React.FC<Props> = ({ item, simple = false }) => {
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
    if (item.quantity !== 1) decrementItem(item.sku)
  }, [])

  return (
    <Link href={`/catalog/product/${item.product_data.id}`}>
      <div className={styles.container}>
        <div>
          <div>
            <Image
              src={item.image!}
              alt={`a picture of ${item.name}`}
              width={189}
              height={258}
              quality={100}
            />
          </div>
        </div>
        <div>
          <div className={styles.detailsContainer}>
            <Typography variant='h5'>{item.name}</Typography>
            <Typography variant='body2'>{item.formattedValue}</Typography>
            <Typography variant='body2'>Qty. {item.quantity}</Typography>
            <div className={simple ? styles.hidden : ''}>
              <div>
                <IconButton
                  color='primary'
                  size='small'
                  className={styles.iconButton}
                  onClick={decrement}>
                  <AiOutlineMinus />
                </IconButton>
                <IconButton
                  color='primary'
                  size='small'
                  className={styles.iconButton}
                  onClick={increment}>
                  <AiOutlinePlus />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    cursor: 'pointer',
    '&:hover': {
      '& h5': {
        textDecoration: 'underline',
      },
    },
  },
  detailsContainer: {
    padding: '1em',
  },

  hidden: {
    display: 'none',
  },

  iconButton: {
    margin: '0.1em 0.5em',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}))

export default React.memo(CartItem)
