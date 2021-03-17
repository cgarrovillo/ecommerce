const PRODUCTION = {
  URLS: {
    API: 'http://localhost:3001/api/v1',
  },
}

const DEVELOPMENT = {
  URLS: {
    API: 'http://localhost:3001/dev/v1',
  },
}

export const URLS = process.env.NODE_ENV === 'production' ? PRODUCTION.URLS : DEVELOPMENT.URLS
export const CURRENCY = 'CAD'
