import {
  Bell,
  BriefcaseBusiness,
  Coffee,
  FlaskConical,
  MessageSquareText,
  Rocket,
  Send,
  Users,
} from 'lucide-react'
import {
  chatPreviews,
  dashboardMetrics,
  opportunities,
  studentProfile,
  teamRequests,
} from '../../data/dashboard'
import { districts } from '../../data/districts'
import { cx } from '../../lib/classNames'
import type { AuthUser } from '../../types/app'
import type { District } from '../../types/city'
import type { StudentProfile } from '../../types/dashboard'
import { Button } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { Tag } from '../ui/Tag'

type DashboardShellProps = {
  activeDistrict: District
  currentUser: AuthUser | null
  profile: StudentProfile
  onEditProfile: () => void
  onSelectDistrict: (district: District) => void
}

const metricTone = {
  cyan: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100',
  emerald: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
  amber: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  pink: 'border-pink-300/20 bg-pink-300/10 text-pink-100',
}

const districtIcon = [
  Users,
  FlaskConical,
  Rocket,
  BriefcaseBusiness,
  Rocket,
  BriefcaseBusiness,
  Coffee,
]

export function DashboardShell({
  activeDistrict,
  currentUser,
  profile,
  onEditProfile,
  onSelectDistrict,
}: DashboardShellProps) {
  return (
    <section className="absolute inset-0 z-10 overflow-y-auto px-4 pt-24 pb-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded border border-white/12 bg-slate-950/72 p-3 backdrop-blur-xl">
          <p className="px-2 text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
            Districts
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {districts.map((district, index) => {
              const Icon = districtIcon[index]
              const isActive = district.id === activeDistrict.id

              return (
                <button
                  key={district.id}
                  type="button"
                  onClick={() => onSelectDistrict(district)}
                  className={cx(
                    'flex min-h-12 items-center gap-2 rounded border px-3 py-2 text-left text-sm transition',
                    isActive
                      ? 'border-cyan-200/50 bg-cyan-300/16 text-white'
                      : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/20',
                  )}
                >
                  <Icon size={16} />
                  <span>{district.name}</span>
                </button>
              )
            })}
          </div>
        </aside>

        <div className="grid gap-4">
          <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <Panel className="min-h-64" eyebrow="Dashboard" title="Student command center">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-3xl leading-tight font-semibold text-white md:text-5xl">
                    {profile.fullName || currentUser?.name || studentProfile.fullName}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    {profile.goals.length > 0
                      ? `Focused on ${profile.goals.join(', ')}.`
                      : 'Add goals to improve teammate and opportunity matching.'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Tag key={skill} tone={skill === 'AI' ? 'pink' : 'cyan'}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="grid min-w-52 gap-2 text-sm text-slate-300">
                  <span>{profile.college || 'College not added'}</span>
                  <span>
                    {[
                      profile.github && 'GitHub',
                      profile.linkedin && 'LinkedIn',
                      profile.portfolio && 'Portfolio',
                    ]
                      .filter(Boolean)
                      .join(' / ') || 'Add links'}
                  </span>
                  <Button icon={<Send size={16} />} onClick={onEditProfile} variant="primary">
                    Update profile
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel eyebrow="Live district" title={activeDistrict.name}>
              <p className="text-sm leading-6 text-slate-300">{activeDistrict.label}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button variant="primary">Find team</Button>
                <Button>Save</Button>
                <Button>Post idea</Button>
                <Button>Open chat</Button>
              </div>
            </Panel>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <div
                key={metric.label}
                className={cx('rounded border p-4 backdrop-blur-xl', metricTone[metric.tone])}
              >
                <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-80">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Panel eyebrow="Recommended" title="Best next opportunities">
              <div className="grid gap-3">
                {opportunities.map((item) => (
                  <article
                    key={item.title}
                    className="rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-200/30"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.source}</p>
                      </div>
                      <span className="text-xs font-medium text-cyan-100">{item.due}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Panel>

            <div className="grid gap-4">
              <Panel
                action={
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-100">
                    <Bell size={14} /> Live
                  </span>
                }
                eyebrow="Requests"
                title="Team matches"
              >
                <div className="grid gap-3">
                  {teamRequests.map((request) => (
                    <div
                      key={request.name}
                      className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.04] px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{request.name}</p>
                        <p className="text-xs text-slate-400">{request.role}</p>
                      </div>
                      <span className="rounded bg-emerald-300/12 px-2 py-1 text-xs font-semibold text-emerald-100">
                        {request.match}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel eyebrow="Messages" title="Recent rooms">
                <div className="grid gap-3">
                  {chatPreviews.map((chat) => (
                    <div
                      key={chat.room}
                      className="flex gap-3 rounded border border-white/10 bg-white/[0.04] p-3"
                    >
                      <MessageSquareText className="mt-1 text-cyan-200" size={17} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{chat.room}</p>
                          <span className="text-xs text-slate-500">{chat.time}</span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
