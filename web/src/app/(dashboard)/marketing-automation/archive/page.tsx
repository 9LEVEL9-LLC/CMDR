"use client"
import { useState } from "react"

export default function ArchivePage() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle')

  const handleSync = () => {
    setSyncStatus('syncing')
    // Simulate sync
    setTimeout(() => {
      setSyncStatus('completed')
      setTimeout(() => setSyncStatus('idle'), 3000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Content Archive</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            AI-indexed personalization engine for your Substack and podcast content
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncStatus === 'syncing'}
          className="btn-primary disabled:opacity-50"
        >
          {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'completed' ? '✓ Synced' : 'Sync Content'}
        </button>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Substack Archive</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Status: <span className="text-yellow-600">Not Connected</span>
              </p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors">
            Connect Substack
          </button>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Podcast Library</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Status: <span className="text-yellow-600">Not Connected</span>
              </p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Add RSS Feed
          </button>
        </div>
      </div>

      {/* Archive Stats */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Archive Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Total Posts Indexed</div>
            <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Podcast Episodes</div>
            <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Value Hooks Identified</div>
            <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Last Sync</div>
            <div className="text-sm font-medium text-[var(--color-text)]">Never</div>
          </div>
        </div>
      </div>

      {/* Content Library */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Content Library</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Browse and search your indexed content
          </p>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No content indexed yet</h4>
            <p className="text-[var(--color-text-muted)] mb-6">
              Connect your Substack or add your podcast RSS feed to get started
            </p>
          </div>
        </div>
      </div>

      {/* Semantic Search */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Semantic Search</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search your content library..."
            className="flex-1 px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            disabled
          />
          <button 
            disabled
            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50"
          >
            Search
          </button>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] mt-3">
          Powered by AI to find relevant content based on meaning, not just keywords
        </p>
      </div>
    </div>
  )
}

