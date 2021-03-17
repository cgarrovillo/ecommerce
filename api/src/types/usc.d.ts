export type CartItem = {
  id: string
  quantity: number
}

export type Checkout = {
  customer: {
    email: string
  }
  cart: CartItem[]
}
