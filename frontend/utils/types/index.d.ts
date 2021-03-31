declare namespace CGCommerce {
  interface ProductVariant extends StrapiObject {
    display_name: string
    color: string
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    material: string
    fulfillment: object
  }

  interface Product extends StrapiObject {
    name: string
    display_name: string
    stripe_id: string
    unit_amount: number
    product_variants: ProductVariant[]
    images: StrapiImage[]
    description: string
  }

  interface ProductCollection extends StrapiObject {
    name: string
    display_name: string
    description: string
    products: Product[]
  }
}

/**
 * Strapi Specific
 */
declare namespace CGCommerce {
  interface StrapiObject {
    _id: string
    id: string
  }

  interface StrapiImageFormat {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: string
    url: string
  }

  interface StrapiImage extends StrapiObject {
    name: string
    alternativeText: string
    caption: string
    hash: string
    ext: string
    mime: string
    size: number
    width: number
    height: number
    url: string
    formats: {
      thumbnail: StrapiImageFormat
      large: StrapiImageFormat
      medium: StrapiImageFormat
      small: StrapiImageFormat
    }
    provider: string
    related: string[]
  }
}

export default CGCommerce
