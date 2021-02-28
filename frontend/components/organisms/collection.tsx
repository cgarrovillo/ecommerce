import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

type Props = {
  collection?: string
  title: string
}

const Collection: React.FC<Props> = ({ collection, title }) => {
  const styles = useStyles()

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12}>
        <Typography variant="h2" className={styles.title}>
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '4em',
  },
  title: {
    textAlign: 'center',
  },
}))

export default Collection
