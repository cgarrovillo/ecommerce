import { makeStyles, Box, Button } from '@material-ui/core'
import React from 'react'

interface Props {
  label: string
  href: string
}

export const HeaderButton: React.FC<Props> = ({ label, href }) => {
  const styles = useStyles()
  return (
    <Box className={styles.container}>
      <Button href={href} className={styles.link}>
        {label}
      </Button>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    display: 'inline-block',
  },
  link: {
    display: 'block',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))
