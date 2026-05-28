import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { AxiosError } from 'axios'
import { ArrowRight, Code2, Loader2, Network, ShieldCheck } from 'lucide-react'
import { api } from '../../lib/api'
import type { AuthUser } from '../../types/app'
import { Button } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { Tag } from '../ui/Tag'
import { TextField } from '../ui/TextField'

type AuthMode = 'login' | 'register'

type AuthScreenProps = {
  onAuthComplete: (user: AuthUser) => void
}

const starterSkills = ['Frontend', 'Backend', 'AI', 'Research', 'UI/UX', 'Open Source']

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}

export function AuthScreen({ onAuthComplete }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('Rayan Khan')
  const [email, setEmail] = useState('rayan@student.dev')
  const [password, setPassword] = useState('campusverse123')
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
  const actionLabel = mode === 'login' ? 'Sign in' : 'Create profile'
  const helperText = useMemo(
    () =>
      mode === 'login'
        ? 'Use your student account to enter the city workspace.'
        : 'Create your student profile before matching starts.',
    [mode],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      const payload = mode === 'login' ? { email, password } : { name, email, password }
      const { data } = await api.post(endpoint, payload)
      onAuthComplete({
        email: data.user?.email ?? email,
        name: data.user?.name ?? name,
      })
    } catch (error) {
      setStatus(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="absolute inset-0 z-10 overflow-y-auto px-4 pt-24 pb-8">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-200 uppercase">
            Student identity
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight font-semibold text-white md:text-6xl">
            One profile for teams, research, gigs, and career moves.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            CampusVerse uses skills, goals, projects, and links to power useful matches across every
            district.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {starterSkills.map((skill) => (
              <Tag key={skill} tone={skill === 'AI' ? 'pink' : 'cyan'}>
                {skill}
              </Tag>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/30 px-3 py-2">
              <Code2 size={16} /> GitHub ready
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/30 px-3 py-2">
              <Network size={16} /> LinkedIn ready
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/30 px-3 py-2">
              <ShieldCheck size={16} /> JWT auth
            </span>
          </div>
        </div>

        <Panel eyebrow={mode === 'login' ? 'Welcome back' : 'New student'} title={actionLabel}>
          <div className="mb-5 grid grid-cols-2 gap-2 rounded border border-white/10 bg-black/24 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === 'login' ? 'bg-cyan-300/20 text-white' : 'text-slate-300'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === 'register' ? 'bg-cyan-300/20 text-white' : 'text-slate-300'
              }`}
            >
              Register
            </button>
          </div>

          <p className="mb-5 text-sm leading-6 text-slate-300">{helperText}</p>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <TextField
                autoComplete="name"
                label="Full name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            )}
            <TextField
              autoComplete="email"
              label="Email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
            <TextField
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              label="Password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />

            {status && (
              <p className="rounded border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
                {status}
              </p>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )
                }
                type="submit"
                variant="primary"
              >
                {actionLabel}
              </Button>
              <Button onClick={() => onAuthComplete({ email, name })} type="button" variant="ghost">
                Continue demo
              </Button>
            </div>
          </form>
        </Panel>
      </div>
    </section>
  )
}
