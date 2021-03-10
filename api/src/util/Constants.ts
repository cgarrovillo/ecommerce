// Constants that are available and the same across both prod & dev environments
const COMMON = {
  IDS: {
    SHIPPING_RATES: {
      FREE: 'shr_1ITHrMJe4oNYc3QvZRakG6hq',
    },
  },
}

const PRODUCTION = {
  ...COMMON,
  URLS: {
    STORE_DOMAIN: 'http://localhost:3000',
  },
}

const DEVELOPMENT = {
  ...COMMON,
  URLS: {
    STORE_DOMAIN: 'http://localhost:3000',
  },
}

export const URLS = process.env.NODE_ENV === 'production' ? PRODUCTION.URLS : DEVELOPMENT.URLS
