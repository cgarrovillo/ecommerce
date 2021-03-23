import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

interface Props {
  children: string | JSX.Element
  href: string
}

const NavbarLink: React.FC<Props> = ({ children, href }) => {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <Link href={href}>
        <Typography className={styles.link} variant='body2'>
          {children}
        </Typography>
      </Link>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    cursor: 'pointer',

    margin: '0 1em',
  },
  link: {
    textTransform: 'none',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}))

export default NavbarLink
