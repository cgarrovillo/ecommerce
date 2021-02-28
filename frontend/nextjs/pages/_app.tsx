import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme } from '../config/theme'

import '../styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // As soon as the app is ready, allow client to take over styling.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
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
