// export * from 'use-shopping-cart/react'

declare module 'use-shopping-cart' {
  export function validateCartItems(
    inventory: useShoppingCart.Product[],
    cartItems: useShoppingCart.CartDetails
  ): Stripe.Checkout.SessionCreateParams.LineItem[]
}
