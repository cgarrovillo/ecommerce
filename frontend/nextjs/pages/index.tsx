import { NextPage } from 'next'
// import Link from 'next/link'
// import Layout from '../components/Layout'

// const IndexPage: NextPage = () => {
//   return (
//     <Layout title="Home | Next.js + TypeScript Example">
//       <ul className="card-list">
//         <li>
//           <Link href="/donate-with-checkout">
//             <a className="card checkout-style-background">
//               <h2 className="bottom">Donate with Checkout</h2>
//               <img src="/checkout-one-time-payments.svg" />
//             </a>
//           </Link>
//         </li>
//         <li>
//           <Link href="/donate-with-elements">
//             <a className="card elements-style-background">
//               <h2 className="bottom">Donate with Elements</h2>
//               <img src="/elements-card-payment.svg" />
//             </a>
//           </Link>
//         </li>
//         <li>
//           <Link href="/use-shopping-cart">
//             <a className="card cart-style-background">
//               <h2 className="bottom">Use Shopping Cart</h2>
//               <img src="/use-shopping-cart.png" />
//             </a>
//           </Link>
//         </li>
//       </ul>
//     </Layout>
//   )
// }

// export default IndexPage
import React from 'react'

import Layout from '../components/Layout'
import Banner from '../components/atoms/banner'
import Collection from '../components/organisms/collection'

import { Typography, makeStyles } from '@material-ui/core'

const IndexPage: NextPage = () => {
  const styles = useStyles()

  return (
    <Layout>
      <Banner>
        <Typography variant='h2' className={styles.bannerText}>
          a brand for the greater good
        </Typography>
      </Banner>
      <img src='/use-shopping-cart.png' />
      <Collection title='the comfort collection' />
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  bannerText: {
    textShadow: '0px 4px 16px  rgba(0,0,0,0.2)',
    [theme.breakpoints.down('xs')]: {
      textShadow: '0px 4px 16px  rgba(0,0,0,0.4)',
    },
  },
}))

export default IndexPage
