"use client"
import { useState } from "react"

export default function FunnelsPage() {
  const [showNewFunnelModal, setShowNewFunnelModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Opt-In Funnels</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Personalized double opt-in campaigns that convert at scale
          </p>
        </div>
        <button
          onClick={() => setShowNewFunnelModal(true)}
          className="btn-primary"
        >
          + Create Funnel
        </button>
      </div>

      {/* Funnels List */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Your Funnels</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Manage email sequences and opt-in workflows
          </p>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No funnels yet</h4>
            <p className="text-[var(--color-text-muted)] mb-6">
              Create your first opt-in funnel to start converting subscribers
            </p>
            <button
              onClick={() => setShowNewFunnelModal(true)}
              className="btn-primary"
            >
              Create First Funnel
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Compliance Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-900">GDPR Compliant</span>
            </div>
            <span className="text-sm text-green-700">Enabled</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-900">CAN-SPAM Compliant</span>
            </div>
            <span className="text-sm text-green-700">Enabled</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-blue-900">Double Opt-In</span>
            </div>
            <span className="text-sm text-blue-700">Required</span>
          </div>
        </div>
      </div>

      {/* New Funnel Modal */}
      {showNewFunnelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Create Opt-In Funnel</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Funnel Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="e.g., Free Subscriber Welcome Series"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Funnel Type
                </label>
                <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option value="free">Free Subscriber</option>
                  <option value="premium">Premium Subscriber</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Target Segment
                </label>
                <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option value="">Select a segment...</option>
                  <option value="1">Tech Founders</option>
                  <option value="2">Marketing Leaders</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewFunnelModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement save
                    setShowNewFunnelModal(false)
                  }}
                  className="btn-primary text-sm"
                >
                  Create Funnel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

