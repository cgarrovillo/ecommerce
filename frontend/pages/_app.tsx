import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { CartProvider, DebugCart } from 'use-shopping-cart'
import NProgress from 'nprogress'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme } from '../config/theme'

import 'swiper/swiper-bundle.min.css'
import '../public/nprogress.css'
import '../public/typography.css'

import getStripe from '../utils/get-stripejs'

const stripe = getStripe()
NProgress.configure({
  parent: '#loading-bar__container',
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // MaterialUI Theming
    // As soon as the app is ready, allow client to take over styling.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    // Loading indicators
    let routeChangeStart = () => NProgress.start()
    let routeChangeComplete = () => NProgress.done()

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)
    router.events.on('routeChangeError', routeChangeComplete)
    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
      router.events.off('routeChangeError', routeChangeComplete)
    }
  }, [])

  return (
    <>
      <CartProvider mode='checkout-session' stripe={stripe} currency='CAD'>
        <ThemeProvider theme={lightTheme}>
          {/* https://material-ui.com/components/css-baseline/ */}
          <CssBaseline />
          {/* <DebugCart /> */}
          <div id='loading-bar__container'></div>
          <Component {...pageProps} />
        </ThemeProvider>
      </CartProvider>
    </>
  )
}

export default MyApp
