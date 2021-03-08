import React, { ReactNode } from 'react'
import Head from 'next/head'
import { CartProvider } from 'use-shopping-cart'
import getStripe from '../utils/get-stripejs'

import Header from './organisms/header'

type Props = {
  children: ReactNode
  title?: string
}

const stripePromise = getStripe()

const Layout = ({ children, title = 'thoughtofyouco' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@christiang.dev' />
      <meta name='twitter:title' content='thoughtofyou' />
      <meta name='twitter:description' content='ThoughtofYou' />
      <meta
        name='twitter:image'
        content='https://nextjs-typescript-react-stripe-js.now.sh/social_card.png'
      />
    </Head>
    <CartProvider mode='checkout-session' stripe={stripePromise} currency='CAD'>
      <>
        <Header />
        <>{children}</>
      </>
    </CartProvider>
  </>
)

export default Layout
