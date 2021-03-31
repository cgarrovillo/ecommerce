import React, { useCallback } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { BiUser } from 'react-icons/bi'
import { useUser } from '@auth0/nextjs-auth0'

import NavLink from './navbar.link'

const UserAccountButton: React.FC<any> = () => {
  const styles = useStyles()
  const { user, error, isLoading } = useUser()

  const goToAccount = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault()
  }, [])

  if (isLoading) return <NavLink href='/api/auth/login'>Sign In</NavLink>
  if (error) {
    console.log(error)
    return <NavLink href='/api/auth/login'>Sign In</NavLink>
  }

  if (user) {
    return (
      <IconButton className={styles.button} aria-label='view user account' onClick={goToAccount}>
        <BiUser />
      </IconButton>
    )
  }

  return <NavLink href='/api/auth/login'>Sign In</NavLink>
}

const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    display: 'block',
    padding: '0.5em 4em',
    borderRadius: 0,

    fontSize: '1.3rem',
    textTransform: 'none',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  button: {
    color: theme.palette.text.primary,
  },
}))

export default React.memo(UserAccountButton)
