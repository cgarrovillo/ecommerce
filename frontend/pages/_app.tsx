import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme } from '../config/theme'

import { routeChangeStart, routeChangeComplete } from '../utils/nprogress'
import BagContextProvider from '../utils/usb/BagContext'

import 'swiper/swiper-bundle.min.css'
import '../public/nprogress.css'
import '../public/typography.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // MaterialUI Theming
    // As soon as the app is ready, allow client to take over styling.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

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
    <ThemeProvider theme={lightTheme}>
      <UserProvider>
        <BagContextProvider>
          {/* https://material-ui.com/components/css-baseline/ */}
          <CssBaseline />
          <div id='loading-bar__container'></div>

          <Component {...pageProps} />
        </BagContextProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp
