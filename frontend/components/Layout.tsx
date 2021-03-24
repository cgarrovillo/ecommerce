import React, { ReactNode } from 'react'
import Head from 'next/head'
import NavBar from './organisms/navbar'

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
    </Head>

    <>
      <NavBar />
      <>{children}</>
    </>
  </>
)

export default Layout
