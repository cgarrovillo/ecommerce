import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme } from '../config/theme'

// Progress bar
NProgress.configure({
  showSpinner: true,
  parent: '#loading__bar',
})
import '../public/nprogress.css'

// SwiperJS
import 'swiper/swiper-bundle.min.css'

// Custom Fonts we use
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

    // Loading bar
    router.events.on('routeChangeStart', (url: string) => {
      NProgress.start()
    })
    router.events.on('routeChangeComplete', () => {
      NProgress.done()
    })
    router.events.on('routeChangeError', () => {
      // NProgress.done()
    })
  }, [])
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        {/* https://material-ui.com/components/css-baseline/ */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
