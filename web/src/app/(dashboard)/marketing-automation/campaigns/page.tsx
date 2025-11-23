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
  created_at: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns`, {
        headers: { Authorization: `Bearer ${token}` }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">All Campaigns</h2>
          <p className="text-[var(--color-text-muted)] mt-1">Manage your newsletter growth campaigns</p>
        </div>
        <Link href="/marketing-automation/campaigns/new" className="btn-primary">
          + Create Campaign
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-[var(--color-text-muted)]">Loading campaigns...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">No campaigns yet</h3>
          <p className="text-[var(--color-text-muted)] mb-6">Get started by creating your first newsletter growth campaign</p>
          <Link href="/marketing-automation/campaigns/new" className="btn-primary">
            Create Your First Campaign
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/marketing-automation/campaigns/${campaign.id}`}
              className="card p-6 hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)]">{campaign.campaign_name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Created {new Date(campaign.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-[var(--color-text-muted)] mb-2">Subscribers</div>
                  <div className="text-2xl font-bold text-[var(--color-text)]">
                    {campaign.current_subscribers?.toLocaleString() || 0} / {campaign.target_subscribers?.toLocaleString()}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-[var(--color-primary)] h-2 rounded-full"
                      style={{ width: `${Math.min((campaign.current_subscribers / campaign.target_subscribers) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-[var(--color-text-muted)] mb-2">Open Rate</div>
                  <div className="text-2xl font-bold text-[var(--color-text)]">
                    {campaign.current_open_rate?.toFixed(1) || 0}% / {campaign.target_open_rate?.toFixed(0)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min((campaign.current_open_rate / campaign.target_open_rate) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

