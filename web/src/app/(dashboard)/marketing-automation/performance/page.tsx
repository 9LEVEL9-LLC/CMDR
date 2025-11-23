"use client"
import { useState } from "react"

export default function PerformancePage() {
  const [dateRange, setDateRange] = useState('7d')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Performance Intelligence</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Real-time metrics, analytics, and AI-powered optimization
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Emails Sent</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          <div className="text-xs text-green-600 mt-2">+0% from previous period</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Open Rate</span>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">0%</div>
          <div className="text-xs text-gray-500 mt-2">Target: 40%</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Click Rate</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">0%</div>
          <div className="text-xs text-gray-500 mt-2">Target: 5%</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Conversions</span>
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">0</div>
          <div className="text-xs text-gray-500 mt-2">0% conversion rate</div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Subscriber Growth</h3>
          <div className="h-64 flex items-center justify-center bg-[var(--color-surface-alt)] rounded-lg">
            <p className="text-[var(--color-text-muted)]">Chart will appear after data collection</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Engagement Trends</h3>
          <div className="h-64 flex items-center justify-center bg-[var(--color-surface-alt)] rounded-lg">
            <p className="text-[var(--color-text-muted)]">Chart will appear after data collection</p>
          </div>
        </div>
      </div>

      {/* Segment Performance */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Segment Performance</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Compare performance across audience segments
          </p>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No data yet</h4>
            <p className="text-[var(--color-text-muted)]">
              Performance data will appear once you start running campaigns
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-700)] flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">AI Recommendations</h3>
            <p className="text-[var(--color-text-muted)]">
              No recommendations yet. AI will analyze your campaign performance and provide optimization suggestions once you have data.
            </p>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">ROI Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Total Investment</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">$0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Revenue Generated</div>
            <div className="text-2xl font-bold text-green-600">$0</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">ROI</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">0x</div>
          </div>
        </div>
      </div>
    </div>
  )
}

