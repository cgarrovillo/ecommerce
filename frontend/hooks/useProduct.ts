import useSWR from 'swr'
import Stripe from 'stripe'
import { axiosGet } from '../utils/api-helpers'

type APIResponse = {
  data?: Stripe.Price
  error?: any
}

interface useProductTypes {
  product: Stripe.Price | undefined
  isLoading: boolean
  isError: any
}

/**
 * Fetches a Stripe.Price object with a Stripe.Product object, given a product_id
 * @param product_id The product_id to fetch a Stripe.Price object for.
 */
const useProduct = (product_id: string | string[]): useProductTypes => {
  const shouldFetch = typeof product_id !== 'undefined'

  const { data, error }: APIResponse = useSWR(
    () => (shouldFetch ? `/api/prices/${product_id}` : null),
    axiosGet
  )

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct
