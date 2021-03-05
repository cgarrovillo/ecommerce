import React, { ReactNode } from 'react'
import Head from 'next/head'

import Header from './organisms/header'

type Props = {
  children: ReactNode
  title?: string
}

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
    <Header />
    <>{children}</>
  </>
)

export default Layout
