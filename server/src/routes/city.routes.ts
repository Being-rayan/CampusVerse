import { Router } from 'express'

const router = Router()

const districts = [
  { id: 'hackathon-hub', name: 'Hackathon Hub', type: 'hackathon' },
  { id: 'research-lab', name: 'Research Lab', type: 'research' },
  { id: 'startup-cafe', name: 'Startup Cafe', type: 'startup' },
  { id: 'freelance-market', name: 'Freelance Market', type: 'freelance' },
  { id: 'open-source-arena', name: 'Open Source Arena', type: 'open-source' },
  { id: 'internship-tower', name: 'Internship Tower', type: 'internship' },
  { id: 'chill-zone', name: 'Chill Zone', type: 'recreation' },
]

router.get('/districts', (_request, response) => {
  response.json({ districts })
})

router.get('/recommendations', (_request, response) => {
  response.json({
    matches: [],
    message: 'Recommendation engine placeholder ready for profile-tag matching.',
  })
})

export { router as cityRouter }
