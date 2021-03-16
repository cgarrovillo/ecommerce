import mongoose from 'mongoose'

/**
 * Creates or reuses a MongoDB connection.
 * When using this, do not wrap in a try-catch, as it is better to fail-fast if something goes wrong.
 * See [this](https://github.com/akornato/lambda-koa-mongo-example/blob/master/lambda/zombies.js)
 * @returns
 */
const connectDB = async () => {
  try {
    return mongoose.connect(
      process.env.MONGODB_URI!,
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail-fast if not connected.
      {
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // MongoDB driver buffering
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  } catch (e) {
    console.error('Could not connect')
    throw e
  }
}

export const getConnection = () => {
  return mongoose.connection
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + process.env.MONGODB_URI)
})
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected')
})

const gracefulShutdown = (msg: string, callback: Function) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg)
    callback()
  })
}

process.on('SIGINT', () => {
  gracefulShutdown('Normal Termination', () => {
    process.exit(0)
  })
})

export default connectDB
