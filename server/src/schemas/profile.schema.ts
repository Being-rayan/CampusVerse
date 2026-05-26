import { z } from 'zod'

const urlSchema = z.string().trim().url().max(300).or(z.literal('')).optional()
const tagSchema = z.string().trim().min(1).max(60).toLowerCase()

const projectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(600).optional(),
  link: urlSchema,
  tags: z.array(tagSchema).max(12).default([]),
})

export const updateProfileSchema = z.object({
  college: z.string().trim().max(140).optional(),
  bio: z.string().trim().max(500).optional(),
  avatarUrl: urlSchema,
  github: urlSchema,
  linkedin: urlSchema,
  portfolio: urlSchema,
  goals: z.array(tagSchema).max(12).optional(),
  interests: z.array(tagSchema).max(20).optional(),
  preferredRoles: z.array(tagSchema).max(12).optional(),
  skills: z.array(tagSchema).max(30).optional(),
  projects: z.array(projectSchema).max(12).optional(),
})
