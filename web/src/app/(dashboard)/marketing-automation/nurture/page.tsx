"use client"
import { useState, useEffect } from "react"

interface Sequence {
  id: number
  sequence_name: string
  emails_in_sequence: number
  is_active: boolean
  total_subscribers: number
  avg_completion_rate: number
}

interface Campaign {
  id: number
  campaign_name: string
}

interface Segment {
  id: number
  segment_name: string
}

export default function NurturePage() {
  const [showNewSequenceModal, setShowNewSequenceModal] = useState(false)
  const [sequences, setSequences] = useState<Sequence[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [segments, setSegments] = useState<Segment[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    sequence_name: '',
    source_segment_id: '',
    emails_in_sequence: 5
  })
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  useEffect(() => {
    if (selectedCampaign) {
      fetchSequences()
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
  
  const fetchSequences = async () => {
    if (!selectedCampaign) return
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/sequences`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setSequences(data.sequences || [])
      }
    } catch (error) {
      console.error("Error fetching sequences:", error)
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
  
  const handleCreateSequence = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign) return
    
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/sequences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          sequence_name: formData.sequence_name,
          source_segment_id: formData.source_segment_id || null,
          emails_in_sequence: formData.emails_in_sequence,
          adaptation_rules: {}
        })
      })
      
      const data = await res.json()
      if (data.ok) {
        alert('✅ Sequence created successfully!')
        setShowNewSequenceModal(false)
        setFormData({
          sequence_name: '',
          source_segment_id: '',
          emails_in_sequence: 5
        })
        fetchSequences()
      } else {
        alert(`❌ Failed to create sequence: ${data.error}`)
      }
    } catch (error) {
      console.error("Error creating sequence:", error)
      alert('❌ Failed to create sequence')
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
          Create a campaign first to start building nurture sequences
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
          Managing sequences for:
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
          {sequences.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {sequences.map((sequence) => (
                <div key={sequence.id} className="border border-[var(--color-border)] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text)]">{sequence.sequence_name}</h4>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        {sequence.emails_in_sequence} emails in sequence
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded ${
                      sequence.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sequence.is_active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--color-text-muted)]">Total Subscribers</div>
                      <div className="font-semibold text-[var(--color-text)]">{sequence.total_subscribers || 0}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)]">Completion Rate</div>
                      <div className="font-semibold text-[var(--color-text)]">{sequence.avg_completion_rate?.toFixed(1) || 0}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Build an automated email sequence that adapts to engagement
              </p>
            </div>
            <form onSubmit={handleCreateSequence}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Sequence Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="e.g., Welcome Series"
                    value={formData.sequence_name}
                    onChange={(e) => setFormData({ ...formData, sequence_name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Source Segment (Optional)
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.source_segment_id}
                    onChange={(e) => setFormData({ ...formData, source_segment_id: e.target.value })}
                  >
                    <option value="">All subscribers</option>
                    {segments.map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.segment_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Target specific audience segments or apply to all subscribers
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Number of Emails *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.emails_in_sequence}
                    onChange={(e) => setFormData({ ...formData, emails_in_sequence: parseInt(e.target.value) })}
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    How many emails in this sequence (1-20)
                  </p>
                </div>
                
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setShowNewSequenceModal(false)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    Create Sequence
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

