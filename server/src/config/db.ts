import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDatabase() {
  mongoose.set('strictQuery', true)

  if (!env.MONGODB_URI) {
    console.info('MongoDB skipped: set MONGODB_URI when database work starts.')
    return false
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.info('MongoDB connected.')
    return true
  } catch (error) {
    console.error('MongoDB connection failed.', error)
    throw error
  }
}

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1
}

export function getDatabaseState() {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected'
    case 1:
      return 'connected'
    case 2:
      return 'connecting'
    case 3:
      return 'disconnecting'
    default:
      return 'unknown'
  }
}
