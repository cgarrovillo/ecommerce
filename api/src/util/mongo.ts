import mongoose from 'mongoose'

let isConnected: boolean

const mongooseOpts: mongoose.ConnectOptions =
  // Buffering means mongoose will queue up operations if it gets
  // disconnected from MongoDB and send them when it reconnects.
  // With serverless, better to fail-fast if not connected.
  {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // MongoDB driver buffering
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

/**
 * Creates or reuses a MongoDB connection.
 * When using this, do not wrap in a try-catch, as it is better to fail-fast if something goes wrong.
 * See [this](https://github.com/akornato/lambda-koa-mongo-example/blob/master/lambda/zombies.js)
 * @returns
 */
const connectDB = async () => {
  try {
    // Try to use an existing connection
    if (isConnected) {
      console.log('=> using existing database connection')
      return Promise.resolve()
    }

    // If not, create one
    console.log('=> using new database connection')
    return mongoose.connect(process.env.MONGODB_URI!, mongooseOpts).then(db => {
      isConnected = db.connection.readyState === 1
    })
  } catch (e) {
    console.error('Could not connect')
    throw e
  }
}

export default connectDB
