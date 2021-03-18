import { Typography, makeStyles } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

const Logo: React.FC<any> = ({ ...props }) => {
  const styles = useStyles()
  return (
    <div {...props}>
      <Typography component='h6' className={styles.root}>
        <Link href='/'>
          <a className={styles.root}>thoughtofyou</a>
        </Link>
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Megona',
    fontSize: '1.3rem',
    color: 'initial',
    '&:visited': {
      color: 'initial',
    },
    textDecoration: 'none',
    WebkitFontSmoothing: 'subpixel-antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
}))

export default Logo
