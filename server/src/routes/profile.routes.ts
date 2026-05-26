import { Router } from 'express'
import { asyncHandler } from '../middleware/async-handler.js'
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.js'
import { requireDatabase } from '../middleware/require-database.js'
import { Profile } from '../models/Profile.js'
import { updateProfileSchema } from '../schemas/profile.schema.js'
import { ApiError } from '../utils/api-error.js'

const router = Router()

router.use(requireDatabase, requireAuth)

router.get(
  '/me',
  asyncHandler(async (request, response) => {
    const authRequest = request as AuthenticatedRequest
    const profile = await Profile.findOne({ user: authRequest.userId })

    if (!profile) {
      throw new ApiError(404, 'Profile not found.')
    }

    response.json({ profile })
  }),
)

router.put(
  '/me',
  asyncHandler(async (request, response) => {
    const authRequest = request as AuthenticatedRequest
    const input = updateProfileSchema.parse(request.body)

    const profile = await Profile.findOneAndUpdate(
      { user: authRequest.userId },
      { $set: input },
      { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true },
    )

    response.json({ profile })
  }),
)

export { router as profileRouter }
