import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'

type Props = {
  children: any
}

// TODO: Sticky this to navbar container. At time of writing, pulling down shows background behind banner.
const Banner: React.FC<Props> = ({ children, ...props }) => {
  const styles = useStyles()

  return (
    <div className={styles.background}>
      <Grid container {...props}>
        <Grid item xs={12} sm={6}>
          <Container className={styles.contentContainer}>{children}</Container>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: 'url(/banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    opacity: '0.99',
    position: 'relative',
  },
  contentContainer: {
    color: theme.palette.secondary.main,
    marginTop: '12em',
    marginBottom: '12em',
    marginLeft: '6em',
    marginRight: '6em',
    wordBreak: 'keep-all',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      textShadow: '0px 4px 16px  rgba(0,0,0,0.4)',
    },
  },
}))

export default Banner
