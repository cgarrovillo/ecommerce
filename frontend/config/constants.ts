const PRODUCTION = {
  URLS: {
    API: 'https://abigo1kfka.execute-api.us-west-2.amazonaws.com/dev/v1',
  },
}

const DEVELOPMENT = {
  URLS: {
    API: 'http://localhost:3005',
  },
}

export const URLS = process.env.NODE_ENV === 'production' ? PRODUCTION.URLS : DEVELOPMENT.URLS
export const CURRENCY = 'CAD'
