"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

interface Campaign {
  id: number
  campaign_name: string
  campaign_description: string
  status: string
  target_subscribers: number
  current_subscribers: number
  target_open_rate: number
  current_open_rate: number
  target_conversion_rate: number
  current_conversion_rate: number
  target_ranking: number
  current_ranking: number
  monthly_budget: number
  total_investment: number
  created_at: string
}

interface Feature {
  id: number
  feature_name: string
  is_active: boolean
  activated_at: string | null
}

export default function CampaignDetailPage() {
  const params = useParams()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)

  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const campaignId = params.id

  useEffect(() => {
    fetchCampaign()
    fetchFeatures()
  }, [campaignId])

  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${campaignId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setCampaign(data.campaign)
      }
    } catch (error) {
      console.error("Error fetching campaign:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${campaignId}/features`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setFeatures(data.features)
      }
    } catch (error) {
      console.error("Error fetching features:", error)
    }
  }

  const toggleFeature = async (featureId: number, currentState: boolean) => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${campaignId}/features/${featureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !currentState })
      })
      const data = await res.json()
      if (data.ok) {
        fetchFeatures() // Refresh features
      }
    } catch (error) {
      console.error("Error toggling feature:", error)
    }
  }

  const calculateProgress = (current: number, target: number) => {
    if (!target) return 0
    return Math.min((current / target) * 100, 100)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-[var(--color-text-muted)]">Loading campaign...</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="card p-12 text-center">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Campaign not found</h3>
        <Link href="/marketing-automation/campaigns" className="text-[var(--color-primary)] hover:underline">
          Back to campaigns
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text)]">{campaign.campaign_name}</h2>
            {campaign.campaign_description && (
              <p className="text-[var(--color-text-muted)] mt-2">{campaign.campaign_description}</p>
            )}
          </div>
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            campaign.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
            campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            campaign.status === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        </div>
        
        <div className="text-sm text-[var(--color-text-muted)]">
          Created {new Date(campaign.created_at).toLocaleDateString()} • 
          Total Investment: ${campaign.total_investment?.toLocaleString()}
        </div>
      </div>

      {/* Goal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Subscriber Goal</div>
          <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
            {campaign.target_subscribers?.toLocaleString()}
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Current: {campaign.current_subscribers?.toLocaleString() || 0}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full transition-all"
              style={{ width: `${calculateProgress(campaign.current_subscribers, campaign.target_subscribers)}%` }}
            ></div>
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            {calculateProgress(campaign.current_subscribers, campaign.target_subscribers).toFixed(1)}% complete
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Open Rate Goal</div>
          <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
            {campaign.target_open_rate}%
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Current: {campaign.current_open_rate?.toFixed(1) || 0}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${calculateProgress(campaign.current_open_rate, campaign.target_open_rate)}%` }}
            ></div>
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            {calculateProgress(campaign.current_open_rate, campaign.target_open_rate).toFixed(1)}% of goal
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Conversion Goal</div>
          <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
            {campaign.target_conversion_rate}%
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Current: {campaign.current_conversion_rate?.toFixed(2) || 0}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${calculateProgress(campaign.current_conversion_rate, campaign.target_conversion_rate)}%` }}
            ></div>
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            {calculateProgress(campaign.current_conversion_rate, campaign.target_conversion_rate).toFixed(1)}% of goal
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Ranking Goal</div>
          <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
            Top {campaign.target_ranking}
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Current: {campaign.current_ranking ? `#${campaign.current_ranking}` : 'Not ranked'}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: campaign.current_ranking ? `${Math.min((campaign.target_ranking / campaign.current_ranking) * 100, 100)}%` : '0%' }}
            ></div>
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            {campaign.current_ranking ? 'Making progress' : 'Not yet ranked'}
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Core System Capabilities</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Enable and configure the 6 integrated growth systems
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className={`p-4 border-2 rounded-lg transition-all ${
                  feature.is_active
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-50)]'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-700)] flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <h4 className="font-semibold text-[var(--color-text)]">{feature.feature_name}</h4>
                    </div>
                    {feature.activated_at && (
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Activated {new Date(feature.activated_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.id, feature.is_active)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      feature.is_active ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        feature.is_active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href={`/marketing-automation/campaigns/${campaignId}/settings`} className="card p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text)]">Campaign Settings</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Configure integrations</p>
            </div>
          </div>
        </Link>

        <Link href="/marketing-automation/performance" className="card p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text)]">View Performance</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Analytics & metrics</p>
            </div>
          </div>
        </Link>

        <Link href="/marketing-automation/audience" className="card p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text)]">Build Audience</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Target & acquire</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

