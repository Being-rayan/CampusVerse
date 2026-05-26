import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

type AuthTokenPayload = {
  sub: string
}

export function signAuthToken(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions)
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload
}
