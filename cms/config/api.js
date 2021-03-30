module.exports = ({ env }) => ({
  responses: {
    privateAttributes: ["__v", "_id", "published_at", "createdAt", "updatedAt"],
  },
  rest: {
    defaultLimit: 100,
    maxLimit: 250,
  },
});
