import { LayoutDashboard, LogIn, Map, Search, UserRound } from 'lucide-react'
import type { AppView, AuthUser } from '../../types/app'
import { Button } from '../ui/Button'

type AppToolbarProps = {
  currentUser: AuthUser | null
  view: AppView
  onViewChange: (view: AppView) => void
}

export function AppToolbar({ currentUser, view, onViewChange }: AppToolbarProps) {
  return (
    <header className="pointer-events-none absolute top-0 right-0 left-0 z-20 border-b border-white/10 bg-slate-950/62 backdrop-blur-xl">
      <div className="pointer-events-auto mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => onViewChange('city')}
          className="mr-auto text-left"
          aria-label="Open CampusVerse city"
        >
          <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-cyan-200 uppercase">
            CampusVerse
          </p>
          <p className="text-sm font-semibold text-white">SkillCity Core</p>
        </button>

        <div className="hidden min-w-64 items-center gap-2 rounded border border-white/10 bg-black/28 px-3 py-2 text-slate-300 lg:flex">
          <Search size={16} />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            placeholder="Search skills, teams, events"
            type="search"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label="City"
            className="px-3 sm:px-4"
            icon={<Map size={16} />}
            onClick={() => onViewChange('city')}
            title="City"
            variant={view === 'city' ? 'primary' : 'ghost'}
          >
            <span className="hidden sm:inline">City</span>
          </Button>
          <Button
            aria-label="Dashboard"
            className="px-3 sm:px-4"
            icon={<LayoutDashboard size={16} />}
            onClick={() => onViewChange('dashboard')}
            title="Dashboard"
            variant={view === 'dashboard' ? 'primary' : 'ghost'}
          >
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <Button
            aria-label={currentUser ? 'Profile' : 'Sign in'}
            className="px-3 sm:px-4"
            icon={currentUser ? <UserRound size={16} /> : <LogIn size={16} />}
            onClick={() => onViewChange(currentUser ? 'profile' : 'auth')}
            title={currentUser ? 'Profile' : 'Sign in'}
            variant={view === 'auth' || view === 'profile' ? 'primary' : 'soft'}
          >
            <span className="hidden sm:inline">{currentUser ? 'Profile' : 'Sign in'}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
