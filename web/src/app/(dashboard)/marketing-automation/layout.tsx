"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function MarketingAutomationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [healthStatus, setHealthStatus] = useState<any>(null)
  const [showMigrationAlert, setShowMigrationAlert] = useState(false)
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    checkHealth()
  }, [])
  
  const checkHealth = async () => {
    try {
      const res = await fetch(`${api}/marketing-automation/health`)
      const data = await res.json()
      setHealthStatus(data)
      if (!data.tables_exist) {
        setShowMigrationAlert(true)
      }
    } catch (error) {
      console.error("Health check failed:", error)
    }
  }
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }
  
  const navLinkClass = (path: string) => {
    const base = "px-4 py-2 text-sm font-medium rounded-md transition-colors"
    if (isActive(path)) {
      return `${base} bg-[var(--color-primary)] text-white`
    }
    return `${base} text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]`
  }

  return (
    <div className="space-y-6">
      {/* Migration Alert */}
      {showMigrationAlert && healthStatus && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">
                Database Migrations Required
              </h3>
              <p className="text-sm text-red-800 mb-3">
                Marketing Automation tables not found. Found {healthStatus.table_count}/37 tables.
              </p>
              <div className="bg-red-100 border border-red-200 rounded p-3 mb-3">
                <p className="text-xs font-mono text-red-900">
                  cd backend<br/>
                  ./run-marketing-automation-migrations.sh
                </p>
              </div>
              <p className="text-xs text-red-700">
                Run this command in your Render Shell (backend service) to create the required database tables.
              </p>
            </div>
            <button
              onClick={() => setShowMigrationAlert(false)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Module Header */}
      <div className="border-b border-[var(--color-border)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Marketing Automation</h1>
        <p className="text-[var(--color-text-muted)]">
          AI-Driven Newsletter Growth System - Manage campaigns, track performance, and optimize conversions
        </p>
      </div>

      {/* Top Navigation */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--color-border)]">
        <Link 
          href="/marketing-automation" 
          className={navLinkClass('/marketing-automation')}
        >
          Dashboard
        </Link>
        <Link 
          href="/marketing-automation/campaigns" 
          className={navLinkClass('/marketing-automation/campaigns')}
        >
          Campaigns
        </Link>
        <Link 
          href="/marketing-automation/audience" 
          className={navLinkClass('/marketing-automation/audience')}
        >
          Audience Building
        </Link>
        <Link 
          href="/marketing-automation/funnels" 
          className={navLinkClass('/marketing-automation/funnels')}
        >
          Opt-In Funnels
        </Link>
        <Link 
          href="/marketing-automation/archive" 
          className={navLinkClass('/marketing-automation/archive')}
        >
          Content Archive
        </Link>
        <Link 
          href="/marketing-automation/nurture" 
          className={navLinkClass('/marketing-automation/nurture')}
        >
          Nurture Campaigns
        </Link>
        <Link 
          href="/marketing-automation/performance" 
          className={navLinkClass('/marketing-automation/performance')}
        >
          Performance
        </Link>
        <Link 
          href="/marketing-automation/settings" 
          className={navLinkClass('/marketing-automation/settings')}
        >
          Settings
        </Link>
      </nav>

      {/* Content Area */}
      <div>
        {children}
      </div>
    </div>
  )
}

