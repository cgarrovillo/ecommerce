import CGCommerce from './index'

export interface CartItem {
  id: string
  unit_amount: number
  quantity: number
  data: CGCommerce.Product
}
