import type { Request, RequestHandler } from 'express'
import { ApiError } from '../utils/api-error.js'
import { verifyAuthToken } from '../utils/tokens.js'

export type AuthenticatedRequest = Request & {
  userId: string
}

function readBearerToken(authorization?: string) {
  if (!authorization?.startsWith('Bearer ')) {
    return null
  }

  return authorization.slice('Bearer '.length).trim()
}

export const requireAuth: RequestHandler = (request, _response, next) => {
  const token = readBearerToken(request.headers.authorization) ?? request.cookies?.accessToken

  if (!token) {
    next(new ApiError(401, 'Authentication required.'))
    return
  }

  try {
    const payload = verifyAuthToken(token)
    const authRequest = request as AuthenticatedRequest
    authRequest.userId = payload.sub
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired session.'))
  }
}
