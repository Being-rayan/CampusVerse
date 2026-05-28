import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { AxiosError } from 'axios'
import { BadgeCheck, Code2, GraduationCap, Link, Network, Save, Target } from 'lucide-react'
import { api } from '../../lib/api'
import type { AuthUser } from '../../types/app'
import type { StudentProfile } from '../../types/dashboard'
import { Button } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { Tag } from '../ui/Tag'
import { TextField } from '../ui/TextField'

type ProfileWorkspaceProps = {
  currentUser: AuthUser | null
  profile: StudentProfile
  onProfileSave: (profile: StudentProfile) => void
}

type ProfileFormState = Omit<
  StudentProfile,
  'goals' | 'interests' | 'preferredRoles' | 'skills'
> & {
  goals: string
  interests: string
  preferredRoles: string
  skills: string
}

function joinTags(tags: string[]) {
  return tags.join(', ')
}

function parseTags(value: string) {
  return Array.from(
    new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  )
}

function toFormState(profile: StudentProfile): ProfileFormState {
  return {
    ...profile,
    goals: joinTags(profile.goals),
    interests: joinTags(profile.interests),
    preferredRoles: joinTags(profile.preferredRoles),
    skills: joinTags(profile.skills),
  }
}

function toProfile(form: ProfileFormState): StudentProfile {
  return {
    ...form,
    goals: parseTags(form.goals),
    interests: parseTags(form.interests),
    preferredRoles: parseTags(form.preferredRoles),
    skills: parseTags(form.skills),
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Profile saved locally. API sync is pending.'
}

export function ProfileWorkspace({ currentUser, profile, onProfileSave }: ProfileWorkspaceProps) {
  const [form, setForm] = useState<ProfileFormState>(() => toFormState(profile))
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState('Ready to edit')

  const preview = useMemo(() => toProfile(form), [form])
  const isProfileReady =
    preview.skills.length > 0 && preview.goals.length > 0 && preview.college.trim()

  function updateField(field: keyof ProfileFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)

    const nextProfile = toProfile(form)
    onProfileSave(nextProfile)

    try {
      await api.put('/profile/me', {
        college: nextProfile.college,
        bio: nextProfile.bio,
        github: nextProfile.github,
        linkedin: nextProfile.linkedin,
        portfolio: nextProfile.portfolio,
        goals: nextProfile.goals,
        interests: nextProfile.interests,
        preferredRoles: nextProfile.preferredRoles,
        skills: nextProfile.skills,
      })
      setStatus('Profile saved and synced')
    } catch (error) {
      setStatus(`Saved locally. ${getErrorMessage(error)}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="absolute inset-0 z-10 overflow-y-auto px-4 pt-24 pb-8">
      <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[1fr_380px]">
        <Panel eyebrow="Student profile" title={isProfileReady ? 'Edit profile' : 'Create profile'}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Full name"
                name="fullName"
                onChange={(event) => updateField('fullName', event.target.value)}
                value={form.fullName}
              />
              <TextField
                label="Email"
                name="email"
                onChange={(event) => updateField('email', event.target.value)}
                type="email"
                value={form.email}
              />
              <TextField
                label="College"
                name="college"
                onChange={(event) => updateField('college', event.target.value)}
                placeholder="Your college or university"
                value={form.college}
              />
              <TextField
                label="GitHub"
                name="github"
                onChange={(event) => updateField('github', event.target.value)}
                placeholder="https://github.com/username"
                type="url"
                value={form.github}
              />
              <TextField
                label="LinkedIn"
                name="linkedin"
                onChange={(event) => updateField('linkedin', event.target.value)}
                placeholder="https://linkedin.com/in/username"
                type="url"
                value={form.linkedin}
              />
              <TextField
                label="Portfolio"
                name="portfolio"
                onChange={(event) => updateField('portfolio', event.target.value)}
                placeholder="https://your-site.com"
                type="url"
                value={form.portfolio}
              />
            </div>

            <label htmlFor="profile-bio" className="block">
              <span className="text-xs font-medium text-slate-300">Bio</span>
              <textarea
                id="profile-bio"
                className="mt-2 min-h-28 w-full resize-y rounded border border-white/10 bg-black/35 px-3 py-3 text-sm text-white transition outline-none placeholder:text-slate-500 focus:border-cyan-200/70 focus:bg-black/45"
                maxLength={500}
                onChange={(event) => updateField('bio', event.target.value)}
                placeholder="Short student intro"
                value={form.bio}
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Skills"
                name="skills"
                onChange={(event) => updateField('skills', event.target.value)}
                placeholder="Frontend, Backend, AI"
                value={form.skills}
              />
              <TextField
                label="Interests"
                name="interests"
                onChange={(event) => updateField('interests', event.target.value)}
                placeholder="Hackathons, Research, Startups"
                value={form.interests}
              />
              <TextField
                label="Preferred roles"
                name="preferredRoles"
                onChange={(event) => updateField('preferredRoles', event.target.value)}
                placeholder="Frontend, Full-stack, UI/UX"
                value={form.preferredRoles}
              />
              <TextField
                label="Goals"
                name="goals"
                onChange={(event) => updateField('goals', event.target.value)}
                placeholder="Find team, Publish paper"
                value={form.goals}
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-300">{status}</p>
              <Button disabled={isSaving} icon={<Save size={16} />} type="submit" variant="primary">
                {isSaving ? 'Saving' : 'Save profile'}
              </Button>
            </div>
          </form>
        </Panel>

        <div className="grid content-start gap-4">
          <Panel eyebrow="Preview" title={preview.fullName || currentUser?.name || 'Student'}>
            <div className="grid gap-4">
              <div className="grid gap-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <GraduationCap size={16} /> {preview.college || 'College not added'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Code2 size={16} /> {preview.github || 'GitHub not added'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Network size={16} /> {preview.linkedin || 'LinkedIn not added'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Link size={16} /> {preview.portfolio || 'Portfolio not added'}
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-300">
                {preview.bio || 'Bio not added yet.'}
              </p>

              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
                  <BadgeCheck size={14} /> Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {preview.skills.map((skill) => (
                    <Tag key={skill} tone={skill.toLowerCase() === 'ai' ? 'pink' : 'cyan'}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-emerald-200 uppercase">
                  <Target size={14} /> Goals
                </p>
                <div className="flex flex-wrap gap-2">
                  {preview.goals.map((goal) => (
                    <Tag key={goal} tone="emerald">
                      {goal}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel eyebrow="Matching data" title="Roles and interests">
            <div className="grid gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-pink-100 uppercase">
                  Preferred roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {preview.preferredRoles.map((role) => (
                    <Tag key={role} tone="pink">
                      {role}
                    </Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-amber-100 uppercase">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {preview.interests.map((interest) => (
                    <Tag key={interest} tone="amber">
                      {interest}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  )
}
