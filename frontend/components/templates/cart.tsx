import { Container } from 'next/app'
import { useShoppingCart } from 'use-shopping-cart'

import CheckoutButton from '../atoms/checkout.button'

const CartContent = () => {
  const { cartDetails } = useShoppingCart()
  const cart = Object.values(cartDetails)
  return (
    <>
      <Container>
        {cart.map((item: any) => (
          <h1>{item.name}</h1>
        ))}
        <CheckoutButton />
      </Container>
    </>
  )
}

export default CartContent
