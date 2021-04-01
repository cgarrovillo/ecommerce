import type { CartDetails } from 'use-shopping-cart'
import type CGCommerce from './types'
import axios from 'axios'

const API = process.env['NEXT_PUBLIC_API_URL']
/**
 * Helper function to GET data from a NextJS API Route
 * @param url
 */
export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then(res => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getAllProducts() {
  const data = await axios.get(`${API}/products`).then(res => res.data)

  if (data) return data
  else throw new Error(`No Products found.`)
}

export async function getProduct(product_id: string) {
  const data = await axios.get(`${API}/products?id_eq=${product_id}`).then(res => res.data)
  if (data) return data[0]
  else throw new Error(`Product doesn't exist.`)
}

export async function getCollection(collection_name: string) {
  const data: CGCommerce.ProductCollection[] = await axios
    .get(`${API}/product-collections?name_eq=${collection_name}`)
    .then(res => res.data)
  if (data && data.length > 0) return data[0]
  else throw new Error(`Collection doesn't exist.`)
}

export async function createCheckoutSession(cart_details: CartDetails) {
  const _cart = Object.values(cart_details)

  const cart_items = _cart.map(item => {
    return {
      id: item.sku,
      quantity: item.quantity,
    }
  })

  return axios({
    method: 'POST',
    url: `${API}/checkout`,
    data: cart_items,
  }).then(res => res.data)
}

export function imgUrl(imgUrlPath: string) {
  return `${API}${imgUrlPath}`
}
