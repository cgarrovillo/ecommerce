import CGCommerce from '../types/index'

export interface CartItem {
  id: string
  unit_amount: number
  quantity: number
  data: CGCommerce.Product
}

/* State management related stuff */
interface ActionWithNoPayload {
  type: string
  payload?: never
}

interface ActionWithPayload {
  type: string
  payload: CartItem
}

export type Action = ActionWithPayload | ActionWithNoPayload

export interface InitialState {
  cartItems: CartItem[]
  itemCount: number
  total: number
}

/* State management functions */
type WithPayloadFn = (payload: CartItem) => void
type NoPayloadFn = () => void

export type addProduct = (payload: CartItem) => void
export type removeProduct = (payload: CartItem) => void
export type increment = (payload: CartItem) => void
export type decrement = (payload: CartItem) => void
export type clearCart = () => void
export type handleCheckout = () => void

export interface ContextValues extends InitialState {
  addProduct: addProduct
  removeProduct: removeProduct
  increment: increment
  decrement: decrement
  clearCart: clearCart
  handleCheckout: handleCheckout
}
