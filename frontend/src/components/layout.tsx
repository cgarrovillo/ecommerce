import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import stripeLogo from '../assets/images/powered_by_stripe.svg'

import '../styles/layout.css'

import '@stripe/stripe-js' // https://github.com/stripe/stripe-js#import-as-a-side-effect

const Layout = ({ children }: any) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          {children}
          <footer>
            <div>
              Built by <a href="https://twitter.com/thorwebdev">Thor</a> with{' '}
              <a href="https://www.gatsbyjs.org">Gatsby</a> | View{' '}
              <a href="https://github.com/gatsbyjs/gatsby/tree/master/examples/ecommerce-tutorial-with-stripe">
                source
              </a>
            </div>
            <div>
              <a href="https://stripe.com">
                <img src={stripeLogo} alt="Payments powered by Stripe" />
              </a>
            </div>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
