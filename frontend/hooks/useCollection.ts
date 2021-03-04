import useSWR from 'swr'
import Stripe from 'stripe'
import { axiosGet } from '../utils/api-helpers'

type APIResponse = {
  data?: Stripe.Price[]
  error?: any
}

interface useCollectionTypes {
  collectionData: Stripe.Price[] | undefined
  isLoading: boolean
  isError: any
}

/**
 * Fetches a Stripe.Price[] with each a Stripe.Product object, given a collection name
 * @param collection The collection name to fetch a Stripe.Price[] for. See the backend for details.
 */
const useProduct = (collection: string | string[]): useCollectionTypes => {
  const shouldFetch = typeof collection !== 'undefined'

  const { data, error }: APIResponse = useSWR(
    () => (shouldFetch ? `/api/collections/${collection}` : null),
    axiosGet
  )

  return {
    collectionData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct
