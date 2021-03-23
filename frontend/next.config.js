// Next Bundle Analyzer to analyze dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  target: 'serverless',
  images: {
    domains: ['files.stripe.com'],
  },
})
