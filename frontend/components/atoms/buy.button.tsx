import { makeStyles, Box, Button } from '@material-ui/core'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

interface Props {
  label: string
  price: any
}

const BuyButton: React.FC<Props> = ({ label, price }) => {
  const styles = useStyles()
  const { addItem } = useShoppingCart()

  // TODO: onClick, Form price object using the passed in price object, then add item to cart

  return (
    <Box className={styles.container}>
      <Button className={styles.link}>{label}</Button>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    display: 'inline-block',
  },
  link: {
    display: 'block',
    padding: '0.5em 4em',
    borderRadius: 0,

    fontSize: '1.3rem',
    textTransform: 'none',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

export default BuyButton
