"use client"
import { useState, useEffect } from "react"

interface Funnel {
  id: number
  funnel_name: string
  funnel_type: string
  is_active: boolean
  total_sent: number
  total_converted: number
}

interface Campaign {
  id: number
  campaign_name: string
}

interface Segment {
  id: number
  segment_name: string
}

export default function FunnelsPage() {
  const [showNewFunnelModal, setShowNewFunnelModal] = useState(false)
  const [funnels, setFunnels] = useState<Funnel[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [segments, setSegments] = useState<Segment[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    funnel_name: '',
    funnel_type: 'free',
    segment_id: ''
  })
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  useEffect(() => {
    if (selectedCampaign) {
      fetchFunnels()
      fetchSegments()
    }
  }, [selectedCampaign])
  
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok && data.campaigns.length > 0) {
        setCampaigns(data.campaigns)
        setSelectedCampaign(data.campaigns[0].id)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
      setLoading(false)
    }
  }
  
  const fetchFunnels = async () => {
    if (!selectedCampaign) return
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/funnels`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setFunnels(data.funnels || [])
      }
    } catch (error) {
      console.error("Error fetching funnels:", error)
    }
  }
  
  const fetchSegments = async () => {
    if (!selectedCampaign) return
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/segments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setSegments(data.segments || [])
      }
    } catch (error) {
      console.error("Error fetching segments:", error)
    }
  }
  
  const handleCreateFunnel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign) return
    
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/funnels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          funnel_name: formData.funnel_name,
          funnel_type: formData.funnel_type,
          segment_id: formData.segment_id || null,
          sequence: []
        })
      })
      
      const data = await res.json()
      if (data.ok) {
        alert('✅ Funnel created successfully!')
        setShowNewFunnelModal(false)
        setFormData({
          funnel_name: '',
          funnel_type: 'free',
          segment_id: ''
        })
        fetchFunnels()
      } else {
        alert(`❌ Failed to create funnel: ${data.error}`)
      }
    } catch (error) {
      console.error("Error creating funnel:", error)
      alert('❌ Failed to create funnel')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-[var(--color-text-muted)]">Loading...</p>
      </div>
    )
  }
  
  if (campaigns.length === 0) {
    return (
      <div className="card p-12 text-center">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">No campaigns yet</h3>
        <p className="text-[var(--color-text-muted)] mb-6">
          Create a campaign first to start building funnels
        </p>
        <a href="/marketing-automation/campaigns/new" className="btn-primary">
          Create Campaign
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Campaign Selector */}
      <div className="card p-6">
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Managing funnels for:
        </label>
        <select
          value={selectedCampaign || ''}
          onChange={(e) => setSelectedCampaign(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.campaign_name}
            </option>
          ))}
        </select>
      </div>
      
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
          {funnels.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {funnels.map((funnel) => (
                <div key={funnel.id} className="border border-[var(--color-border)] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text)]">{funnel.funnel_name}</h4>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          funnel.funnel_type === 'free' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {funnel.funnel_type === 'free' ? 'Free Subscriber' : 'Premium Subscriber'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          funnel.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {funnel.is_active ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--color-text-muted)]">Total Sent</div>
                      <div className="font-semibold text-[var(--color-text)]">{funnel.total_sent || 0}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)]">Conversions</div>
                      <div className="font-semibold text-[var(--color-text)]">{funnel.total_converted || 0}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Set up a double opt-in email sequence
              </p>
            </div>
            <form onSubmit={handleCreateFunnel}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Funnel Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="e.g., Free Subscriber Welcome Series"
                    value={formData.funnel_name}
                    onChange={(e) => setFormData({ ...formData, funnel_name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Funnel Type *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.funnel_type}
                    onChange={(e) => setFormData({ ...formData, funnel_type: e.target.value })}
                  >
                    <option value="free">Free Subscriber</option>
                    <option value="premium">Premium Subscriber</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Target Segment (Optional)
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.segment_id}
                    onChange={(e) => setFormData({ ...formData, segment_id: e.target.value })}
                  >
                    <option value="">All subscribers</option>
                    {segments.map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.segment_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Leave blank to apply to all subscribers, or select a specific segment
                  </p>
                </div>
                
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setShowNewFunnelModal(false)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    Create Funnel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

