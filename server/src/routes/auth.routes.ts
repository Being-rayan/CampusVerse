import bcrypt from 'bcrypt'
import { Router } from 'express'
import { isDatabaseReady } from '../config/db.js'
import { env } from '../config/env.js'
import { asyncHandler } from '../middleware/async-handler.js'
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.js'
import { requireDatabase } from '../middleware/require-database.js'
import { Profile } from '../models/Profile.js'
import { User } from '../models/User.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import { ApiError } from '../utils/api-error.js'
import { signAuthToken } from '../utils/tokens.js'

const router = Router()

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

function sanitizeUser(user: {
  id: string
  name: string
  email: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

function assertDatabaseReady() {
  if (!isDatabaseReady()) {
    throw new ApiError(503, 'MongoDB is not connected. Set MONGODB_URI and start MongoDB.')
  }
}

async function buildAuthResponse(userId: string) {
  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, 'User not found.')
  }

  const profile = await Profile.findOne({ user: user.id })
  const token = signAuthToken(user.id)

  return {
    token,
    user: sanitizeUser(user),
    profile,
  }
}

router.post(
  '/register',
  asyncHandler(async (request, response) => {
    const input = registerSchema.parse(request.body)
    assertDatabaseReady()

    const existingUser = await User.exists({ email: input.email })

    if (existingUser) {
      throw new ApiError(409, 'Email is already registered.')
    }

    const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_ROUNDS)
    const user = await User.create({
      name: input.name,
      email: input.email,
      passwordHash,
    })

    const profile = await Profile.create({ user: user.id })
    const token = signAuthToken(user.id)

    response.cookie('accessToken', token, cookieOptions)
    response.status(201).json({
      token,
      user: sanitizeUser(user),
      profile,
    })
  }),
)

router.post(
  '/login',
  asyncHandler(async (request, response) => {
    const input = loginSchema.parse(request.body)
    assertDatabaseReady()

    const user = await User.findOne({ email: input.email }).select('+passwordHash')

    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new ApiError(401, 'Invalid email or password.')
    }

    user.lastLoginAt = new Date()
    await user.save()

    const authResponse = await buildAuthResponse(user.id)
    response.cookie('accessToken', authResponse.token, cookieOptions)
    response.json(authResponse)
  }),
)

router.post('/logout', (_request, response) => {
  response.clearCookie('accessToken')
  response.json({ message: 'Logged out.' })
})

router.get(
  '/me',
  requireDatabase,
  requireAuth,
  asyncHandler(async (request, response) => {
    const authRequest = request as AuthenticatedRequest
    response.json(await buildAuthResponse(authRequest.userId))
  }),
)

export { router as authRouter }
