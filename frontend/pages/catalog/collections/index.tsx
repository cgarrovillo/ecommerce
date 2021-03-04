import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'

import Layout from '../../../components/Layout'
import Banner from '../../../components/atoms/banner'
import Collection from '../../../components/templates/collection'

import { Typography, makeStyles } from '@material-ui/core'

const Collections: NextPage = () => {
  const { data, error } = useSWR('/api/collections')
  const styles = useStyles()

  return (
    <Layout>
      <Banner>
        <Typography variant='h2' className={styles.bannerText}>
          brand collection
        </Typography>
      </Banner>
      {/* <Collection title='the comfort collection' /> */}
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

export default Collections
