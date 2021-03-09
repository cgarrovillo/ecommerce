const PRODUCTION = {
  URLS: {
    API: 'http://localhost:3001/api',
  },
}

const DEVELOPMENT = {
  URLS: {
    API: 'http://localhost:3001/dev',
  },
}

export const URLS = process.env.NODE_ENV === 'production' ? PRODUCTION.URLS : DEVELOPMENT.URLS
export const CURRENCY = 'CAD'
