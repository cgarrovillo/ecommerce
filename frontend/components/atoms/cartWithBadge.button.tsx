import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Badge } from '@material-ui/core'
import { BsBag, BsBagFill } from 'react-icons/bs'

import { useShoppingBag } from '../../utils/usb/BagContext'

/**
 * Workaround for MUI Badges; doesn't play as well with Server-side stuff like NextJS
 * @param open Determines how the icon is styled. open=true for fill
 */
const CartIconWithBadge = ({ open = false }) => {
  const { itemCount } = useShoppingBag()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(itemCount!)
  }, [itemCount, open])

  return (
    <Badge color='primary' badgeContent={count}>
      {open ? <BsBagFill size={'0.88em'} /> : <BsBag size={'0.88em'} />}
    </Badge>
  )
}

export default dynamic(() => Promise.resolve(CartIconWithBadge), {
  ssr: false,
})
