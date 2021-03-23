import React, { useCallback } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { BiUser } from 'react-icons/bi'

import NavLink from './navbar.link'

// temp
const user = false
const isLoading = false
const error = false

const UserAccountButton: React.FC<any> = () => {
  const styles = useStyles()

  const goToAccount = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

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

export default UserAccountButton
