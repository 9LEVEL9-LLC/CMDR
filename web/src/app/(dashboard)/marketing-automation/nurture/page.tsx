"use client"
import { useState } from "react"

export default function NurturePage() {
  const [showNewSequenceModal, setShowNewSequenceModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Nurture Campaigns</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Adaptive email sequences that optimize based on engagement
          </p>
        </div>
        <button
          onClick={() => setShowNewSequenceModal(true)}
          className="btn-primary"
        >
          + Create Sequence
        </button>
      </div>

      {/* SendGrid Status */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">SendGrid Integration</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Status: <span className="text-yellow-600">Not Connected</span>
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Connect SendGrid
          </button>
        </div>
      </div>

      {/* Nurture Sequences */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Active Sequences</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Manage your automated email campaigns
          </p>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No sequences yet</h4>
            <p className="text-[var(--color-text-muted)] mb-6">
              Create your first nurture sequence to start engaging subscribers
            </p>
            <button
              onClick={() => setShowNewSequenceModal(true)}
              className="btn-primary"
            >
              Create First Sequence
            </button>
          </div>
        </div>
      </div>

      {/* A/B Tests */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">A/B Testing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Active Tests</div>
            <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Completed Tests</div>
            <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Avg. Improvement</div>
            <div className="text-3xl font-bold text-green-600">-%</div>
          </div>
        </div>
      </div>

      {/* Engagement Tracking */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Total Sent</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Avg Open Rate</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">0%</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Avg Click Rate</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">0%</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Conversions</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">0</div>
          </div>
        </div>
      </div>

      {/* New Sequence Modal */}
      {showNewSequenceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Create Nurture Sequence</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Sequence Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="e.g., Welcome Series"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Source Segment
                </label>
                <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option value="">All subscribers</option>
                  <option value="1">Tech Founders</option>
                  <option value="2">Marketing Leaders</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Number of Emails
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="5"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewSequenceModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement save
                    setShowNewSequenceModal(false)
                  }}
                  className="btn-primary text-sm"
                >
                  Create Sequence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

