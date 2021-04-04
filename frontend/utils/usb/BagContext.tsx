import React, { createContext, useReducer, useContext } from 'react'
import { CartReducer, sumItems } from './BagReducer'
import { CartItem, InitialState, ContextValues } from './types'

const getFromStorage = () => {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []
}

const BagContext = createContext<ContextValues>(null!)
const lStorage = typeof window !== 'undefined' && getFromStorage()
const initialState: InitialState = { cartItems: lStorage, ...sumItems(lStorage) }

const BagContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const increment = (payload: CartItem) => {
    dispatch({ type: 'INCREMENT', payload })
  }

  const decrement = (payload: CartItem) => {
    dispatch({ type: 'DECREMENT', payload })
  }

  const addProduct = (payload: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload })
  }

  const removeProduct = (payload: CartItem) => {
    dispatch({ type: 'REMOVE_ITEM', payload })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const handleCheckout = () => {
    console.log('CHECKOUT', state)
    dispatch({ type: 'CHECKOUT' })
  }

  const contextValues = {
    removeProduct,
    addProduct,
    increment,
    decrement,
    clearCart,
    handleCheckout,
    ...state,
  }

  return <BagContext.Provider value={contextValues}>{children}</BagContext.Provider>
}

export const useShoppingBag = () => {
  return useContext(BagContext)
}
export default BagContextProvider
