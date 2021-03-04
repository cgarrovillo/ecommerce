import { NextPage } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import Banner from '../components/atoms/banner'
import Collection from '../components/templates/collection'

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
      <Collection collection='comfort2021' title='the comfort collection' />

      <Banner>
        <Typography variant='h2' className={styles.bannerText}>
          a brand for the greater good
        </Typography>
      </Banner>
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
