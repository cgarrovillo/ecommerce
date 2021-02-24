import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Grid, makeStyles } from '@material-ui/core'

type Props = {
  children: any
}

const Banner: React.FC<Props> = ({ children }) => {
  const styles = useStyles()
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 6000, quality: 100, webpQuality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )
  const imgData = data.file.childImageSharp.fluid

  return (
    <BackgroundImage fluid={imgData}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Container className={styles.container}>{children}</Container>
        </Grid>
      </Grid>
    </BackgroundImage>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
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
