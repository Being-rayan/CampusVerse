import type {
  ChatPreview,
  Metric,
  Opportunity,
  StudentProfile,
  TeamRequest,
} from '../types/dashboard'

export const studentProfile: StudentProfile = {
  fullName: 'Rayan Khan',
  email: 'rayan@student.dev',
  college: 'CampusVerse Student',
  bio: 'Frontend builder exploring 3D student collaboration products.',
  github: 'https://github.com/Being-rayan',
  linkedin: 'https://linkedin.com/in/rayan',
  portfolio: 'https://campusverse.local',
  goals: ['hackathon teams', 'research partners', 'internship leads'],
  interests: ['ai', '3d web', 'open source', 'startups'],
  preferredRoles: ['frontend', 'full-stack', 'ui/ux'],
  skills: ['Frontend', 'Three.js', 'Backend', 'AI', 'UI/UX'],
}

export const dashboardMetrics: Metric[] = [
  { label: 'Profile match', value: '86%', tone: 'cyan' },
  { label: 'Open requests', value: '12', tone: 'pink' },
  { label: 'Active rooms', value: '5', tone: 'emerald' },
  { label: 'Saved roles', value: '18', tone: 'amber' },
]

export const opportunities: Opportunity[] = [
  {
    title: 'AI Campus Hack Sprint',
    source: 'Hackathon Hub',
    tags: ['AI', 'Frontend', 'Team of 4'],
    due: 'Closes Friday',
  },
  {
    title: 'Student Research: Smart City Routing',
    source: 'Research Lab',
    tags: ['Research', 'ML', 'Paper'],
    due: '2 mentors online',
  },
  {
    title: 'Open Source UI Issue Board',
    source: 'Open Source Arena',
    tags: ['React', 'Good first issue'],
    due: 'Live now',
  },
]

export const teamRequests: TeamRequest[] = [
  { name: 'Aisha', role: 'Backend + APIs', match: '92%' },
  { name: 'Kabir', role: 'AI model builder', match: '88%' },
  { name: 'Meera', role: 'Pitch + design', match: '81%' },
]

export const chatPreviews: ChatPreview[] = [
  {
    room: 'AI Hackathon Team',
    message: 'Need one frontend dev for the city dashboard.',
    time: '2m',
  },
  {
    room: 'Research Lab',
    message: 'Paper outline shared for review.',
    time: '18m',
  },
  {
    room: 'Chill Zone',
    message: 'Snake mini game idea locked for next phase.',
    time: '1h',
  },
]
