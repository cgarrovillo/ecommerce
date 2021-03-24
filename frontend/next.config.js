// Next Bundle Analyzer to analyze dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = {
  images: {
    domains: ['files.stripe.com'],
  },
  reactStrictMode: true,
}
