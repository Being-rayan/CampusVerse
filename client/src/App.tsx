import { useState } from 'react'
import { AuthScreen } from './components/auth/AuthScreen'
import { CityScene } from './components/city/CityScene'
import { DashboardShell } from './components/dashboard/DashboardShell'
import { ProfileWorkspace } from './components/profile/ProfileWorkspace'
import { AppToolbar } from './components/shell/AppToolbar'
import { CityHeader } from './components/shell/CityHeader'
import { DistrictNav } from './components/shell/DistrictNav'
import { studentProfile } from './data/dashboard'
import { useCityStore } from './store/cityStore'
import type { AppView, AuthUser } from './types/app'
import type { StudentProfile } from './types/dashboard'

function App() {
  const [view, setView] = useState<AppView>('city')
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<StudentProfile>(studentProfile)
  const activeDistrict = useCityStore((state) => state.activeDistrict)
  const setActiveDistrict = useCityStore((state) => state.setActiveDistrict)

  function handleAuthComplete(user: AuthUser) {
    setCurrentUser(user)
    setView('dashboard')
  }

  function handleProfileSave(nextProfile: StudentProfile) {
    setProfile(nextProfile)
    setCurrentUser({
      email: nextProfile.email,
      name: nextProfile.fullName || currentUser?.name || 'Student',
    })
  }

  const isCityView = view === 'city'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040711] text-slate-100">
      {isCityView ? (
        <CityScene activeDistrict={activeDistrict} onSelect={setActiveDistrict} />
      ) : (
        <div className="absolute inset-0 bg-[#07111f]" />
      )}

      <div
        className={`pointer-events-none absolute inset-0 ${
          isCityView
            ? 'bg-[radial-gradient(circle_at_50%_10%,rgba(17,217,255,0.16),transparent_32%),linear-gradient(180deg,rgba(4,7,17,0)_40%,rgba(4,7,17,0.9)_100%)]'
            : 'bg-[radial-gradient(circle_at_50%_10%,rgba(17,217,255,0.16),transparent_32%),linear-gradient(180deg,rgba(4,7,17,0)_40%,rgba(4,7,17,0.9)_100%)]'
        }`}
      />

      <AppToolbar currentUser={currentUser} onViewChange={setView} view={view} />

      {view === 'city' && (
        <>
          <CityHeader activeDistrict={activeDistrict} />
          <DistrictNav activeDistrict={activeDistrict} onSelect={setActiveDistrict} />
        </>
      )}

      {view === 'dashboard' && (
        <DashboardShell
          activeDistrict={activeDistrict}
          currentUser={currentUser}
          onEditProfile={() => setView('profile')}
          onSelectDistrict={setActiveDistrict}
          profile={profile}
        />
      )}

      {view === 'profile' && (
        <ProfileWorkspace
          currentUser={currentUser}
          onProfileSave={handleProfileSave}
          profile={profile}
        />
      )}

      {view === 'auth' && <AuthScreen onAuthComplete={handleAuthComplete} />}
    </main>
  )
}

export default App
