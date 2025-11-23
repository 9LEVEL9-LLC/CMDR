"use client"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import OnboardingBanner from "@/components/OnboardingBanner"
import { PasswordChangeModal } from "@/components/PasswordChangeModal"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false)
  const [checkingPassword, setCheckingPassword] = useState(true)

  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const authHeaders = useMemo<HeadersInit | undefined>(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("xsourcing_token") : null
    return t ? { Authorization: `Bearer ${t}` } : undefined
  }, [])

  useEffect(() => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      if (!token) return
      // rudimentary decode to extract role (JWT payload is middle part)
      const payload = JSON.parse(atob(token.split(".")[1] || ""))
      setRole(payload?.role ?? null)
      setName(payload?.name ?? null)
      
      // Check if user needs to change password
      checkPasswordStatus()
    } catch {}
  }, [])

  const checkPasswordStatus = async () => {
    try {
      const res = await fetch(`${api}/me`, { headers: authHeaders })
      const data = await res.json()
      if (data.ok && data.user) {
        setNeedsPasswordChange(!data.user.initial_password_changed)
      }
    } catch (e) {
      console.error('Failed to check password status:', e)
    } finally {
      setCheckingPassword(false)
    }
  }

  const handlePasswordChanged = () => {
    setNeedsPasswordChange(false)
  }

  const logout = () => {
    try {
      localStorage.removeItem("xsourcing_token")
      document.cookie = "xsourcing_token=; Max-Age=0; Path=/;"
    } catch {}
    window.location.href = "/"
  }

  return (
    <>
      <OnboardingBanner />
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[208px_1fr]">
        <aside className="flex flex-col justify-between border-r border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
        <div>
          <div className="mb-6 text-2xl font-bold text-[var(--color-primary)]">CMDR</div>
          <nav className="space-y-2 text-sm">
          <Link className="block rounded-md px-3 py-2 hover:bg-white" href={role === 'admin' ? '/admin' : role === 'advisor' ? '/advisor' : '/dashboard'}>Dashboard</Link>
          {role === 'client' && (
            <>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/client-onboarding">Onboarding</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/projects">Projects</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/roadmap">Your AI Ecosystem</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/change-requests">Change Requests</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/client/communications">Communications</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/marketing-automation">Marketing Automation</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/learning">Learning Center</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/client/completed">Completed Projects</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/client/ideas">Project Ideas</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/chat">AI Ideator</Link>
            </>
          )}
          {role === 'advisor' && (
            <>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/client-onboarding">Client Onboarding</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/advisor/crm">CRM</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/advisor/financial-view">Financial View</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/advisor/communications">Communications</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/advisor/create-project">Create new project</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/change-requests">Submit Change Requests</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/roadmap">Company Ecosystems</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/marketing-automation">Marketing Automation</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/advisor/prebuilt">Pre-Built Projects</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/schedule">Schedule</Link>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/admin">Admin</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/admin/webinars">Webinars</Link>
              <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/admin/email">Email Center</Link>
            </>
          )}
          </nav>
        </div>
        <div className="text-sm">
          <Link className="block rounded-md px-3 py-2 hover:bg-white" href="/profile">Profile & settings</Link>
          <button onClick={logout} className="mt-2 block w-full rounded-md px-3 py-2 text-left hover:bg-white">Logout</button>
        </div>
      </aside>
      <main className="p-6">
        <div className="mb-4 flex items-center justify-end gap-3">
          {role && (
            <span className="text-xs text-[var(--color-text-muted)]">
              {role === 'client' && `Signed in as client: ${name ?? ''}`}
              {role === 'advisor' && `Signed in as advisor: ${name ?? ''}`}
              {role === 'admin' && 'Signed in as Admin'}
            </span>
          )}
          <button onClick={logout} className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold shadow-card">Logout</button>
        </div>
        {children}
      </main>
      </div>
      
      {/* Password Change Modal - shown persistently until user changes password */}
      {!checkingPassword && needsPasswordChange && (
        <PasswordChangeModal 
          api={api}
          authHeaders={authHeaders}
          onPasswordChanged={handlePasswordChanged}
        />
      )}
    </>
  )
}


