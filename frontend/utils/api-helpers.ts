import axios from 'axios'

import { URLS } from '../config/constants'

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
  return axios.get(`${URLS.API}/products`).then(res => res.data)
}

export async function getPriceOfProduct(product_id: string) {
  return axios.get(`${URLS.API}/prices/${product_id}`).then(res => res.data)
}

export async function getCollection(collection_name: string) {
  return axios.get(`${URLS.API}/collections/${collection_name}`).then(res => res.data)
}
