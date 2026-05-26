import type { RequestHandler } from 'express'
import { isDatabaseReady } from '../config/db.js'
import { ApiError } from '../utils/api-error.js'

export const requireDatabase: RequestHandler = (_request, _response, next) => {
  if (!isDatabaseReady()) {
    next(new ApiError(503, 'MongoDB is not connected. Set MONGODB_URI and start MongoDB.'))
    return
  }

  next()
}
