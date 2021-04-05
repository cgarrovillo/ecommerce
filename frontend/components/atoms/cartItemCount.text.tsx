import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Typography } from '@material-ui/core'

import { useShoppingBag } from '../../utils/usb/BagContext'

/**
 * Workaround for cart items count text; doesn't play as well with Server-side stuff like NextJS
 */
const CartItemCountWithText = () => {
  const { itemCount } = useShoppingBag()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(itemCount!)
  }, [itemCount])

  return (
    <Typography variant='body1' component='span' suppressHydrationWarning>
      {typeof window !== 'undefined' && count && (count > 1 ? `${count} items` : `${count} item`)}
    </Typography>
  )
}

export default dynamic(() => Promise.resolve(CartItemCountWithText), {
  ssr: false,
})
