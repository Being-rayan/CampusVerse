import type { ErrorRequestHandler, RequestHandler } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { env } from '../config/env.js'
import { ApiError } from '../utils/api-error.js'

type MongoDuplicateKeyError = Error & {
  code?: number
  keyPattern?: Record<string, unknown>
}

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(new ApiError(404, `Route not found: ${request.method} ${request.originalUrl}`))
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Invalid request data.',
      issues: error.issues,
    })
    return
  }

  if (error instanceof mongoose.Error.ValidationError) {
    response.status(400).json({
      message: 'Database validation failed.',
      issues: Object.values(error.errors).map((issue) => issue.message),
    })
    return
  }

  if (error instanceof mongoose.Error.CastError) {
    response.status(400).json({ message: 'Invalid resource id.' })
    return
  }

  const duplicateError = error as MongoDuplicateKeyError
  if (duplicateError.code === 11000) {
    response.status(409).json({ message: 'A record with this value already exists.' })
    return
  }

  if (error instanceof ApiError) {
    response.status(error.statusCode).json({ message: error.message })
    return
  }

  console.error(error)
  response.status(500).json({
    message: 'Internal server error.',
    ...(env.NODE_ENV === 'development'
      ? { detail: error instanceof Error ? error.message : error }
      : {}),
  })
}
