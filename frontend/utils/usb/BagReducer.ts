import { CartItem, Action, InitialState } from './types'

const setLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== 'undefined')
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []))
}
export const sumItems = (cartItems: CartItem[]) => {
  let itemCount = 0
  let total = 0
  if (typeof window !== 'undefined') {
    setLocalStorage(cartItems)
    itemCount = cartItems.reduce((total, product) => total + product.quantity, 0)
    total = cartItems.reduce((total, product) => total + product.unit_amount * product.quantity, 0)
  }
  return { itemCount, total }
}

export const CartReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find((item) => item.id === action.payload?.id)) {
        state.cartItems.push({
          ...action.payload!,
          quantity: 1,
        })
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        ...sumItems(state.cartItems.filter((item) => item.id !== action.payload?.id)),
        cartItems: [...state.cartItems.filter((item) => item.id !== action.payload?.id)],
      }
    case 'INCREMENT':
      state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload?.id)].quantity++
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      }
    case 'DECREMENT':
      const item = state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload?.id)]

      if (item.quantity > 1) item.quantity--

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      }
    case 'CHECKOUT':
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      }
    case 'CLEAR':
      return {
        cartItems: [],
        ...sumItems([]),
      }
    default:
      return state
  }
}
