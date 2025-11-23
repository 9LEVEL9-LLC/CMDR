"use client"
import { useState, useEffect } from "react"

interface Segment {
  id: number
  segment_name: string
  targeting_criteria: any
  budget_allocated: number
  budget_spent: number
  leads_acquired: number
  conversion_rate: number
  status: string
}

interface Campaign {
  id: number
  campaign_name: string
}

export default function AudienceBuildingPage() {
  const [showNewSegmentModal, setShowNewSegmentModal] = useState(false)
  const [segments, setSegments] = useState<Segment[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    segment_name: '',
    functions: '',
    industries: '',
    geos: '',
    interests: '',
    budget_allocated: 1000
  })
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  useEffect(() => {
    if (selectedCampaign) {
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
  
  const handleCreateSegment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign) return
    
    try {
      const token = localStorage.getItem("xsourcing_token")
      const targeting_criteria = {
        functions: formData.functions.split(',').map(s => s.trim()).filter(Boolean),
        industries: formData.industries.split(',').map(s => s.trim()).filter(Boolean),
        geos: formData.geos.split(',').map(s => s.trim()).filter(Boolean),
        interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean)
      }
      
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/segments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          segment_name: formData.segment_name,
          targeting_criteria,
          budget_allocated: formData.budget_allocated
        })
      })
      
      const data = await res.json()
      if (data.ok) {
        alert('✅ Segment created successfully!')
        setShowNewSegmentModal(false)
        setFormData({
          segment_name: '',
          functions: '',
          industries: '',
          geos: '',
          interests: '',
          budget_allocated: 1000
        })
        fetchSegments()
      } else {
        alert(`❌ Failed to create segment: ${data.error}`)
      }
    } catch (error) {
      console.error("Error creating segment:", error)
      alert('❌ Failed to create segment')
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
          Create a campaign first to start building audiences
        </p>
        <a href="/marketing-automation/campaigns/new" className="btn-primary">
          Create Campaign
        </a>
      </div>
    )
  }
  
  const totalBudget = 5000 // This should come from campaign
  const totalAllocated = segments.reduce((sum, s) => sum + (s.budget_allocated || 0), 0)
  const totalSpent = segments.reduce((sum, s) => sum + (s.budget_spent || 0), 0)

  return (
    <div className="space-y-6">
      {/* Campaign Selector */}
      <div className="card p-6">
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Managing audience for:
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
          {segments.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {segments.map((segment) => (
                <div key={segment.id} className="border border-[var(--color-border)] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text)]">{segment.segment_name}</h4>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${
                        segment.status === 'active' ? 'bg-green-100 text-green-800' :
                        segment.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {segment.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--color-text-muted)]">Budget Allocated</div>
                      <div className="font-semibold text-[var(--color-text)]">${segment.budget_allocated?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)]">Budget Spent</div>
                      <div className="font-semibold text-[var(--color-text)]">${segment.budget_spent?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)]">Leads Acquired</div>
                      <div className="font-semibold text-[var(--color-text)]">{segment.leads_acquired || 0}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)]">Conversion Rate</div>
                      <div className="font-semibold text-[var(--color-text)]">{segment.conversion_rate?.toFixed(2) || 0}%</div>
                    </div>
                  </div>
                  
                  {segment.targeting_criteria && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <div className="text-xs text-[var(--color-text-muted)] mb-2">Targeting Criteria:</div>
                      <div className="flex flex-wrap gap-2">
                        {segment.targeting_criteria.functions?.map((f: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {f}
                          </span>
                        ))}
                        {segment.targeting_criteria.industries?.map((ind: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Budget Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Total Budget</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">${totalBudget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Allocated</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">${totalAllocated.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Remaining</div>
            <div className={`text-2xl font-bold ${totalBudget - totalAllocated > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(totalBudget - totalAllocated).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-[var(--color-primary)] h-3 rounded-full transition-all"
            style={{ width: `${Math.min((totalAllocated / totalBudget) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-[var(--color-text-muted)] mt-2 text-right">
          {((totalAllocated / totalBudget) * 100).toFixed(1)}% allocated
        </div>
      </div>

      {/* New Segment Modal */}
      {showNewSegmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Create Audience Segment</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Define your target audience for AI-powered list building
              </p>
            </div>
            <form onSubmit={handleCreateSegment}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Segment Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="e.g., Tech Founders"
                    value={formData.segment_name}
                    onChange={(e) => setFormData({ ...formData, segment_name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Target Functions
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="CEO, CTO, Product Manager (comma-separated)"
                    value={formData.functions}
                    onChange={(e) => setFormData({ ...formData, functions: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Industries
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="SaaS, AI/ML, FinTech (comma-separated)"
                    value={formData.industries}
                    onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Geographies
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="USA, UK, Canada (comma-separated)"
                    value={formData.geos}
                    onChange={(e) => setFormData({ ...formData, geos: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Interests/Topics
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="AI, Growth, Startups (comma-separated)"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Budget Allocation ($) *
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="1000"
                    value={formData.budget_allocated}
                    onChange={(e) => setFormData({ ...formData, budget_allocated: parseFloat(e.target.value) })}
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Amount to allocate for this segment from your monthly budget
                  </p>
                </div>
                
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setShowNewSegmentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    Create Segment
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

