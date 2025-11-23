"use client"
import { useState } from "react"

export default function AudienceBuildingPage() {
  const [showNewSegmentModal, setShowNewSegmentModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Audience Building</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Apollo-powered targeting and list acquisition
          </p>
        </div>
        <button
          onClick={() => setShowNewSegmentModal(true)}
          className="btn-primary"
        >
          + Create Segment
        </button>
      </div>

      {/* Apollo Connection Status */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Apollo.io Integration</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Status: <span className="text-yellow-600">Not Connected</span>
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors">
            Connect Apollo
          </button>
        </div>
      </div>

      {/* Audience Segments */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Audience Segments</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Target specific audiences with AI-powered segmentation
          </p>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No segments yet</h4>
            <p className="text-[var(--color-text-muted)] mb-6">
              Create your first audience segment to start building targeted lists
            </p>
            <button
              onClick={() => setShowNewSegmentModal(true)}
              className="btn-primary"
            >
              Create First Segment
            </button>
          </div>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Budget Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Total Budget</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">$5,000</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Allocated</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">$0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Remaining</div>
            <div className="text-2xl font-bold text-green-600">$5,000</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div className="bg-[var(--color-primary)] h-3 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* New Segment Modal */}
      {showNewSegmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Create Audience Segment</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Segment Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="e.g., Tech Founders"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Target Functions
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="CEO, CTO, Product Manager..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Industries
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="SaaS, AI/ML, FinTech..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Budget Allocation ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="1000"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewSegmentModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement save
                    setShowNewSegmentModal(false)
                  }}
                  className="btn-primary text-sm"
                >
                  Create Segment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

