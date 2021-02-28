import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Banner from '../components/atoms/banner'
import Collection from '../components/organisms/collection'

import Checkout from '../components/checkout'
import { Typography, makeStyles } from '@material-ui/core'

const IndexPage = () => {
  const styles = useStyles()

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Banner>
        <Typography variant="h2" className={styles.bannerText}>
          a brand for the greater good
        </Typography>
      </Banner>

      <Collection title="the comfort collection" />

      <h1>Hi rt</h1>
      <p>Welcome to your new Gatsby e-commerce site.</p>
      <p>
        Follow
        <a href="https://www.gatsbyjs.org/tutorial/ecommerce-tutorial/">
          this tutorial
        </a>
        to build your own.
      </p>
      <Checkout />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/advanced/">Go to the advanced example</Link>
    </Layout>
  )
}

const useStyles = makeStyles((theme) => ({
  bannerText: {
    textShadow: '0px 4px 16px  rgba(0,0,0,0.2)',
    [theme.breakpoints.down('xs')]: {
      textShadow: '0px 4px 16px  rgba(0,0,0,0.4)',
    },
  },
}))

export default IndexPage
