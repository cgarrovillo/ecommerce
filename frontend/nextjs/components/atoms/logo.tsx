import { Typography, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import React from 'react'

export const Logo: React.FC<any> = ({ ...props }) => {
  const styles = useStyles()
  return (
    <div {...props}>
      <Typography component="h6" className={styles.root}>
        <Link href="/" className={styles.root}>
          thoughtofyou
        </Link>
      </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Megona',
    fontSize: '1.3rem',
  },
}))
