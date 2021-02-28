import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'

type Props = {
  children: any
}

const Banner: React.FC<Props> = ({ children }) => {
  const styles = useStyles()

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Container className={styles.contentContainer}>{children}</Container>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: 'url(/use-shopping-cart.png)',
  },
  contentContainer: {
    color: theme.palette.secondary.main,
    marginTop: '12em',
    marginBottom: '12em',
    marginLeft: '4em',
    marginRight: '4em',
    wordBreak: 'keep-all',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textShadow: '0px 4px 16px  rgba(0,0,0,0.4)',
    },
  },
}))

export default Banner
