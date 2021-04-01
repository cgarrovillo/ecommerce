import NProgress from 'nprogress'

NProgress.configure({
  parent: '#loading-bar__container',
})

// Loading indicators
export const routeChangeStart = () => NProgress.start()
export const routeChangeComplete = () => NProgress.done()
