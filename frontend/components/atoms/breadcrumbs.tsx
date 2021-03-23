import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles, Typography } from '@material-ui/core'

interface Crumb {
  label: string
  path: string
}

type Props = {
  name?: string
}

const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Crumb>>([])
  const styles = useStyles()

  useEffect(() => {
    if (router) {
      const fullPath = router.asPath.split('/')
      fullPath.shift()

      const _pathArray: Array<Crumb> = fullPath.map((path, i) => {
        return {
          label: i === fullPath.length - 1 && name ? name.toLowerCase() : path,
          path: `/${fullPath.slice(0, i + 1).join('/')}`,
        }
      })

      setBreadcrumbs(_pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <nav aria-label='breadcrumbs'>
      <ol className={styles.ol}>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.path} className={styles.li}>
              <Link href={breadcrumb.path}>
                <Typography variant='h5' component='span' className={styles.label}>
                  {breadcrumb.label}
                </Typography>
              </Link>

              {i !== breadcrumbs.length - 1 && (
                <span className={styles.slashes} aria-hidden>
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

const useStyles = makeStyles({
  ol: {
    padding: 0,
    margin: 0,
  },
  li: {
    listStyle: 'none',
    display: 'inline',
  },
  label: {
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  slashes: {
    fontSize: '1.3rem',
  },
})

export default Breadcrumbs
