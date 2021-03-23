# thoughtofyou - API

Because of the way that NextJS pre-renders pages, this API is built **outside** of Next's API Routes because the data required has to be fetched from Stripe & therefore cannot be kept in an API route.
This also gives an added benefit of becoming framework agnostic; The code here can be dropped into another API and deployed as another Serverless function.
