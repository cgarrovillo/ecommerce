import { IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

// TODO: useShoppingCart , wrap in materialui Badge, put drawer logic in here
const CartButton: React.FC = () => {
  const styles = useStyles()
  return (
    <IconButton aria-label='add to bag'>
      <AiOutlineShopping />
    </IconButton>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    cursor: 'pointer',

    margin: '0 1em',
  },
  link: {
    textTransform: 'none',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}))

export default CartButton
