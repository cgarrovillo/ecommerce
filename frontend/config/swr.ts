import type { ConfigInterface } from 'swr'

// https://swr.vercel.app/docs/options
const swrOptions: ConfigInterface = {
  errorRetryCount: 3,
  focusThrottleInterval: 10000,
}
export default swrOptions
