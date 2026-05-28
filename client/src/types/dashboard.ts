export type Metric = {
  label: string
  value: string
  tone: 'cyan' | 'emerald' | 'amber' | 'pink'
}

export type Opportunity = {
  title: string
  source: string
  tags: string[]
  due: string
}

export type TeamRequest = {
  name: string
  role: string
  match: string
}

export type ChatPreview = {
  room: string
  message: string
  time: string
}

export type StudentProfile = {
  fullName: string
  email: string
  college: string
  bio: string
  github: string
  linkedin: string
  portfolio: string
  goals: string[]
  interests: string[]
  preferredRoles: string[]
  skills: string[]
}
