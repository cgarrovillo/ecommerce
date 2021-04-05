import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'

import { formatAmountForDisplayDecimal } from '../../utils/stripe-helpers'
import { imgUrl } from '../../utils/api-helpers'
import type { CartItem } from '../../utils/usb/types'

const CartItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
  const styles = useStyles()

  return (
    <Link href={`/catalog/product/${item.data.id}`}>
      <div className={styles.container}>
        <div>
          <div>
            <Image
              src={imgUrl(item.data.images[0].url)}
              alt={`a picture of ${item.data.name}`}
              width={189}
              height={258}
              quality={100}
            />
          </div>
        </div>
        <div>
          <div className={styles.detailsContainer}>
            <Typography variant='h5'>{item.data.name}</Typography>
            <Typography variant='body2'>{formatAmountForDisplayDecimal(item.data.unit_amount)}</Typography>
            <Typography variant='body2'>Qty. {item.quantity}</Typography>
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

export default React.memo(CartItemCard)
