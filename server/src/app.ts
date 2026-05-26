import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'
import { authRouter } from './routes/auth.routes.js'
import { cityRouter } from './routes/city.routes.js'
import { healthRouter } from './routes/health.routes.js'
import { profileRouter } from './routes/profile.routes.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  )
  app.use(compression())
  app.use(cookieParser())
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  )

  app.use('/api', healthRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/city', cityRouter)
  app.use('/api/profile', profileRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
