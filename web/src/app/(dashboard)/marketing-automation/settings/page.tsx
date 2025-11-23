"use client"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'notifications' | 'team'>('integrations')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Settings</h2>
        <p className="text-[var(--color-text-muted)] mt-1">
          Configure integrations, notifications, and team access
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="border-b border-[var(--color-border)]">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'integrations'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'notifications'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'team'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Team Access
          </button>
        </nav>
      </div>

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {[
            { name: 'Apollo.io', icon: '🎯', description: 'Audience targeting and list building', connected: false },
            { name: 'Substack', icon: '📰', description: 'Newsletter platform integration', connected: false },
            { name: 'SendGrid', icon: '✉️', description: 'Email delivery service', connected: false },
            { name: 'Claude AI', icon: '🤖', description: 'AI-powered content and optimization', connected: false },
            { name: 'Pinecone', icon: '🔍', description: 'Vector database for semantic search', connected: false },
            { name: 'Stripe', icon: '💳', description: 'Payment processing', connected: false },
          ].map((integration) => (
            <div key={integration.name} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">{integration.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    integration.connected
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.connected ? 'Connected' : 'Not Connected'}
                  </span>
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors text-sm">
                    {integration.connected ? 'Configure' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { title: 'Campaign Milestones', description: 'Get notified when campaigns hit key milestones' },
              { title: 'Budget Alerts', description: 'Alerts when budget thresholds are reached' },
              { title: 'Performance Alerts', description: 'Notifications for significant performance changes' },
              { title: 'Weekly Reports', description: 'Receive weekly performance summaries' },
              { title: 'System Health', description: 'Alerts for integration or system issues' },
            ].map((notif) => (
              <div key={notif.title} className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
                <div>
                  <div className="font-medium text-[var(--color-text)]">{notif.title}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">{notif.description}</div>
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-[var(--color-text)]">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-[var(--color-text)]">Platform</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Access Tab */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Team Members</h3>
              <button className="btn-primary text-sm">+ Invite Member</button>
            </div>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No team members</h4>
              <p className="text-[var(--color-text-muted)]">Invite team members to collaborate on campaigns</p>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Role Permissions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                <div className="font-medium text-[var(--color-text)] mb-2">Owner</div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  Full access to all features including settings, team management, and billing
                </div>
              </div>
              <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                <div className="font-medium text-[var(--color-text)] mb-2">Manager</div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  Can manage campaigns, budgets, and view reports. Cannot modify settings or team.
                </div>
              </div>
              <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                <div className="font-medium text-[var(--color-text)] mb-2">Analyst</div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  View-only access to dashboards and reports. Cannot edit campaigns.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

