"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MarketingAutomationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
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

