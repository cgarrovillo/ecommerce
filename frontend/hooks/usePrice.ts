import useSWR from 'swr'
import Stripe from 'stripe'
import { axiosGet } from '../utils/api-helpers'

import swrOptions from '../config/swr'

type APIResponse = {
  data?: Stripe.Price
  error?: any
}

interface usePriceTypes {
  price: Stripe.Price | undefined
  isError: any
}

/**
 * Fetches a Stripe.Price object with a Stripe.Product object, given a product_id
 * This function is extracted to promote reusability, and to improve performance.
 * See [SWR Deduplication.](https://swr.vercel.app/advanced/performance#deduplication)
 * @param product_id The product_id to fetch a Stripe.Price object for.
 */
const usePrice = (product_id: string | string[], initialData?: any): usePriceTypes => {
  const shouldFetch = typeof product_id !== 'undefined'
  console.log(initialData)

  const opts = initialData ? { ...swrOptions, initialData: initialData } : swrOptions

  const { data, error }: APIResponse = useSWR(
    () => (shouldFetch ? `/api/prices/${product_id}` : null),
    axiosGet,
    opts
  )
  return {
    price: data,
    isError: error,
  }
}

export default usePrice
