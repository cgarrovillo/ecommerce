import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { CartProvider, DebugCart } from 'use-shopping-cart'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme } from '../config/theme'

import 'swiper/swiper-bundle.min.css'
import '../public/typography.css'

import getStripe from '../utils/get-stripejs'
const stripe = getStripe()

// TODO: loading indicator. probably NProgress again
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // MaterialUI Theming
    // As soon as the app is ready, allow client to take over styling.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <CartProvider mode='checkout-session' stripe={stripe} currency='CAD'>
        <ThemeProvider theme={lightTheme}>
          {/* https://material-ui.com/components/css-baseline/ */}
          <CssBaseline />
          <DebugCart />
          <Component {...pageProps} />
        </ThemeProvider>
      </CartProvider>
    </>
  )
}

export default MyApp
