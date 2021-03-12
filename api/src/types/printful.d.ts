namespace Printful {
  type Address = {
    name: string
    company: string
    address1: string
    address2: string
    city: string
    state_code: string
    state_name: string
    country_code: string
    country_name: string
    zip: string
    phone: string
    email: string
  }

  type ProductVariant = {
    variant_id: number
    product_id: number
    image: string
    name: string
  }

  type File = {
    id: number

    /**
     * Source URL where the file is downloaded from
     */
    url: string
  }

  /**
   * Retail costs that are to be displayed on the packing slip for international shipments.
   * Retail costs are used only if every item in order contains the retail_price attribute.
   */
  type Costs = {
    currency: string
    subtotal: string
    discount: string
    shipping: string
    digitization: string
    tax: string
    vat: string
    total: string
  }

  /**
   * Printful Line item
   */
  type Item = {
    id: number
    external_id: string
    variant_id: number
    sync_variant_id: number
    external_variant_id: string
    //...

    quantity: number
    price?: string
    retail_price?: string

    /**
     * The actual printfiles.
     * What will be printed on the product.
     */
    files: File[]

    /**
     * Display name of the item. If not given, a
     * name from the Printful system will be displayed on the packing slip
     */
    name: string
    product: ProductVariant

    // ...
    sku: string
  }

  namespace Order {
    type OrderPackingSlip = {
      email: string
      phone: string
      message: string
      logo_url: string
    }

    type OrderInput = {
      external_id?: string
      shipping?: string
      recipient: Address
      items: Item[]
      retail_costs?: Costs
    }
  }
}

export default Printful
