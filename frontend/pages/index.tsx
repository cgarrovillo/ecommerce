import type Stripe from 'stripe'
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

import Layout from '../components/Layout'
import Banner from '../components/atoms/banner'
import Collection from '../components/templates/collection.gallery'

import { getCollection } from '../utils/api-helpers'

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps = async () => {
  // Determines the collection to highlight on the HomePage
  const collectionData: Stripe.Price[] = await getCollection('comfort2021')

  return { props: { collectionData } }
}

/**
 * SSG Rendered Home Page. The home page mainly contains Collections and not the full catalog.
 * Thus, only collections need to be fetched.
 * @returns
 */
const HomePage = ({ collectionData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const styles = useStyles()

  return (
    <Layout>
      <Banner>
        <Typography variant='h2' className={styles.bannerText}>
          a brand for the greater good
        </Typography>
      </Banner>
      <Collection collectionData={collectionData} title='the comfort collection' />
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

export default HomePage
