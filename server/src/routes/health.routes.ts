import { Router } from 'express'
import { getDatabaseState } from '../config/db.js'

const router = Router()

router.get('/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'campusverse-api',
    database: getDatabaseState(),
    time: new Date().toISOString(),
  })
})

export { router as healthRouter }
