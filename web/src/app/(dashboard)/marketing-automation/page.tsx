"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Campaign {
  id: number
  campaign_name: string
  status: string
  target_subscribers: number
  current_subscribers: number
  target_open_rate: number
  current_open_rate: number
  monthly_budget: number
  created_at: string
}

export default function MarketingAutomationDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.ok) {
        setCampaigns(data.campaigns || [])
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }
  
  const calculateProgress = (current: number, target: number) => {
    if (!target) return 0
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-700)] text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2">AI-Driven Newsletter Growth System</h2>
        <p className="text-white/90 mb-6">
          Deploy an AI-powered growth engine that drives your newsletter from zero to Top 10 verified Substack ranking with 100,000+ subscribers
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Create New Campaign
          </button>
          <Link
            href="/marketing-automation/campaigns"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center"
          >
            View All Campaigns
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Active Campaigns</span>
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            campaigns running
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Total Subscribers</span>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">
            {campaigns.reduce((sum, c) => sum + (c.current_subscribers || 0), 0).toLocaleString()}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            across all campaigns
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Avg Open Rate</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">
            {campaigns.length > 0 
              ? (campaigns.reduce((sum, c) => sum + (c.current_open_rate || 0), 0) / campaigns.length).toFixed(1)
              : '0'}%
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            engagement rate
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-muted)]">Monthly Budget</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--color-text)]">
            ${campaigns.reduce((sum, c) => sum + (c.monthly_budget || 0), 0).toLocaleString()}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            total allocated
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Your Campaigns</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Manage and monitor all your newsletter growth campaigns
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary text-sm"
            >
              + Create Campaign
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-[var(--color-text-muted)]">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">No campaigns yet</h4>
              <p className="text-[var(--color-text-muted)] mb-6">
                Get started by creating your first newsletter growth campaign
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/marketing-automation/campaigns/${campaign.id}`}
                  className="block border border-[var(--color-border)] rounded-lg p-6 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                        {campaign.campaign_name}
                      </h4>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Created {new Date(campaign.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-[var(--color-text-muted)] mb-1">Subscriber Progress</div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-[var(--color-text)]">
                          {campaign.current_subscribers?.toLocaleString() || 0}
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)] mb-1">
                          / {campaign.target_subscribers?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-[var(--color-primary)] h-2 rounded-full transition-all"
                          style={{ width: `${calculateProgress(campaign.current_subscribers, campaign.target_subscribers)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[var(--color-text-muted)] mb-1">Open Rate</div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-[var(--color-text)]">
                          {campaign.current_open_rate?.toFixed(1) || 0}%
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)] mb-1">
                          / {campaign.target_open_rate?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${calculateProgress(campaign.current_open_rate, campaign.target_open_rate)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[var(--color-text-muted)] mb-1">Monthly Budget</div>
                      <div className="text-2xl font-bold text-[var(--color-text)]">
                        ${campaign.monthly_budget?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)] mt-2">
                        Allocated per month
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/marketing-automation/audience" className="card p-6 hover:shadow-card transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">Build Audience</h4>
          <p className="text-sm text-[var(--color-text-muted)]">
            Use AI-powered Apollo integration to discover and target your ideal subscribers
          </p>
        </Link>

        <Link href="/marketing-automation/nurture" className="card p-6 hover:shadow-card transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">Nurture Campaigns</h4>
          <p className="text-sm text-[var(--color-text-muted)]">
            Create adaptive email sequences that respond to subscriber engagement
          </p>
        </Link>

        <Link href="/marketing-automation/performance" className="card p-6 hover:shadow-card transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">Track Performance</h4>
          <p className="text-sm text-[var(--color-text-muted)]">
            Monitor real-time metrics, ROI, and AI-powered optimization recommendations
          </p>
        </Link>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Create New Campaign</h3>
            </div>
            <div className="p-6">
              <p className="text-[var(--color-text-muted)] mb-6">
                Campaign creation wizard will be available soon. For now, please use the API or contact support.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/marketing-automation/campaigns/new"
                  className="btn-primary text-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Continue to Setup
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

