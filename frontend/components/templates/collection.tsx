import React from 'react'
import useSWR from 'swr'
import Stripe from 'stripe'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import ProductCard from '../molecules/product.card'

type Props = {
  collection: string
  title: string
}

type APIResponse = {
  data?: Stripe.Price[] | undefined
  error?: any
}

/**
 * Displays all Stripe products with the collection metadata.
 * @param collection The collection value, taken from Product metadata
 * @param title The display title for this collection
 */
const Collection: React.FC<Props> = ({ collection, title }) => {
  const { data, error }: APIResponse = useSWR(`/api/collections/${collection}`)
  const styles = useStyles()

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12}>
        <Typography variant='h2' className={styles.title}>
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {data?.map(data => (
          <ProductCard price={data} />
        ))}
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '4em',
  },
  title: {
    textAlign: 'center',
    paddingBottom: '2em',
  },
}))

export default Collection
