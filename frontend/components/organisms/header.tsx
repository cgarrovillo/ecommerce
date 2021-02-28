import React from 'react'
import { makeStyles, AppBar } from '@material-ui/core'
import CollapsibleToolbar from '../molecules/collapsibleToolbar'

const Header = () => {
  const styles = useStyles()
  return (
    <>
      <AppBar color='secondary'>
        <CollapsibleToolbar />
      </AppBar>
      <div className={styles.offset} /> {/* So nothing is behind the Appbar*/}
    </>
  )
}

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  logoContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

export default Header
