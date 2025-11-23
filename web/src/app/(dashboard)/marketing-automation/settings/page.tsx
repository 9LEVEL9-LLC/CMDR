"use client"
import { useState, useEffect } from "react"

interface Integration {
  id: number
  provider: string
  is_connected: boolean
  is_active: boolean
  health_status: string
  last_sync: string | null
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'notifications' | 'team'>('integrations')
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [integrations, setIntegrations] = useState<Integration[]>([])
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  
  useEffect(() => {
    fetchCampaigns()
  }, [])
  
  useEffect(() => {
    if (selectedCampaign) {
      fetchIntegrations()
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
        setSelectedCampaign(data.campaigns[0].id) // Auto-select first campaign
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    }
  }
  
  const fetchIntegrations = async () => {
    if (!selectedCampaign) return
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/integrations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setIntegrations(data.integrations || [])
      }
    } catch (error) {
      console.error("Error fetching integrations:", error)
    }
  }
  
  const saveIntegration = async (provider: string, formData: any) => {
    if (!selectedCampaign) {
      alert('Please select a campaign first')
      return
    }
    
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${selectedCampaign}/integrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          provider,
          api_key: formData.api_key,
          api_secret: formData.api_secret || '',
          additional_config: formData.additional_config || {}
        })
      })
      const data = await res.json()
      if (data.ok) {
        alert(`✅ ${getProviderInfo(provider).name} connected successfully!`)
        fetchIntegrations()
        setActiveIntegration(null)
      } else {
        alert(`❌ Failed to connect: ${data.error}`)
      }
    } catch (error) {
      console.error("Error saving integration:", error)
      alert("❌ Failed to save integration. Please try again.")
    }
  }
  
  const getProviderInfo = (provider: string) => {
    const providers: Record<string, any> = {
      apollo: { name: 'Apollo.io', icon: '🎯', color: 'blue', description: 'Audience targeting and list building' },
      substack: { name: 'Substack', icon: '📰', color: 'purple', description: 'Newsletter platform integration' },
      sendgrid: { name: 'SendGrid', icon: '✉️', color: 'blue', description: 'Email delivery service' },
      claude: { name: 'Claude AI', icon: '🤖', color: 'orange', description: 'AI-powered content and optimization' },
      pinecone: { name: 'Pinecone', icon: '🔍', color: 'green', description: 'Vector database for semantic search' },
      stripe: { name: 'Stripe', icon: '💳', color: 'indigo', description: 'Payment processing' },
    }
    return providers[provider] || { name: provider, icon: '🔌', color: 'gray', description: 'Integration service' }
  }
  
  const handleConfigureIntegration = (provider: string) => {
    if (!selectedCampaign) {
      alert('Please select a campaign first')
      return
    }
    setActiveIntegration(provider)
  }
  
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeIntegration) return
    
    const formData: any = {}
    const apiKeyInput = document.getElementById(`${activeIntegration}-api-key`) as HTMLInputElement
    
    if (!apiKeyInput?.value) {
      alert('API Key is required')
      return
    }
    
    formData.api_key = apiKeyInput.value
    
    // Get additional fields
    const additionalConfig: any = {}
    
    if (activeIntegration === 'substack') {
      const urlInput = document.getElementById(`${activeIntegration}-url`) as HTMLInputElement
      if (urlInput?.value) additionalConfig.publication_url = urlInput.value
    }
    
    if (activeIntegration === 'sendgrid') {
      const fromEmailInput = document.getElementById(`${activeIntegration}-from-email`) as HTMLInputElement
      if (fromEmailInput?.value) additionalConfig.from_email = fromEmailInput.value
    }
    
    if (activeIntegration === 'pinecone') {
      const envInput = document.getElementById(`${activeIntegration}-environment`) as HTMLInputElement
      const indexInput = document.getElementById(`${activeIntegration}-index`) as HTMLInputElement
      if (envInput?.value) additionalConfig.environment = envInput.value
      if (indexInput?.value) additionalConfig.index_name = indexInput.value
    }
    
    if (activeIntegration === 'stripe') {
      const publishableInput = document.getElementById(`${activeIntegration}-publishable`) as HTMLInputElement
      if (publishableInput?.value) additionalConfig.publishable_key = publishableInput.value
    }
    
    formData.additional_config = additionalConfig
    
    saveIntegration(activeIntegration, formData)
  }
  
  const getIntegrationFields = (provider: string) => {
    switch (provider) {
      case 'apollo':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Apollo API Key *
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Enter your Apollo API key"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Get your API key from Apollo.io Settings → API
              </p>
            </div>
          </>
        )
      
      case 'substack':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Substack Publication URL *
              </label>
              <input
                type="url"
                id={`${provider}-url`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="https://yourpublication.substack.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                API Key
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Your Substack API key (if available)"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Optional: For advanced features. Enter URL only for basic sync.
              </p>
            </div>
          </>
        )
      
      case 'sendgrid':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                SendGrid API Key *
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="SG.xxxxxxxxxxxxxxxxxx"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Get your API key from SendGrid Settings → API Keys
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                From Email *
              </label>
              <input
                type="email"
                id={`${provider}-from-email`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="noreply@yourdomain.com"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                This email must be verified in SendGrid
              </p>
            </div>
          </>
        )
      
      case 'claude':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Anthropic API Key *
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="sk-ant-xxxxxxxxxxxxxxxxxx"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Get your API key from <a href="https://console.anthropic.com" target="_blank" className="text-[var(--color-primary)] hover:underline">console.anthropic.com</a>
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 Claude powers the AI personalization, content recommendations, and automated optimization.
              </p>
            </div>
          </>
        )
      
      case 'pinecone':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Pinecone API Key *
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Environment *
              </label>
              <input
                type="text"
                id={`${provider}-environment`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="us-east-1-aws"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Found in your Pinecone dashboard
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Index Name *
              </label>
              <input
                type="text"
                id={`${provider}-index`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="newsletter-content"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Name of your Pinecone index for content vectors
              </p>
            </div>
          </>
        )
      
      case 'stripe':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Stripe Secret Key *
              </label>
              <input
                type="password"
                id={`${provider}-api-key`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="sk_live_xxxxxxxxxxxxxxxxxx or sk_test_xxxxxxxxxxxxxxxxxx"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Use test key (sk_test_) for testing, live key (sk_live_) for production
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Publishable Key *
              </label>
              <input
                type="text"
                id={`${provider}-publishable`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="pk_live_xxxxxxxxxxxxxxxxxx or pk_test_xxxxxxxxxxxxxxxxxx"
                required
              />
            </div>
          </>
        )
      
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              API Key *
            </label>
            <input
              type="password"
              id={`${provider}-api-key`}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Enter your API key"
              required
            />
          </div>
        )
    }
  }

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
        <div className="space-y-6">
          {/* Campaign Selector */}
          {campaigns.length > 0 && (
            <div className="card p-6">
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Configure integrations for:
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
          )}
          
          {campaigns.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-[var(--color-text-muted)] mb-4">
                Create a campaign first to configure integrations
              </p>
              <a href="/marketing-automation/campaigns/new" className="btn-primary">
                Create Campaign
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {['apollo', 'substack', 'sendgrid', 'claude', 'pinecone', 'stripe'].map((provider) => {
                const info = getProviderInfo(provider)
                const integration = integrations.find(i => i.provider === provider)
                
                return (
                  <div key={provider} className="card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{info.icon}</div>
                        <div>
                          <h3 className="font-semibold text-[var(--color-text)]">{info.name}</h3>
                          <p className="text-sm text-[var(--color-text-muted)]">{info.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          integration?.is_connected
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {integration?.is_connected ? 'Connected' : 'Not Connected'}
                        </span>
                        <button
                          onClick={() => handleConfigureIntegration(provider)}
                          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors text-sm"
                        >
                          {integration?.is_connected ? 'Reconfigure' : 'Connect'}
                        </button>
                      </div>
                    </div>
                    {integration?.last_sync && (
                      <div className="mt-3 text-xs text-[var(--color-text-muted)]">
                        Last synced: {new Date(integration.last_sync).toLocaleString()}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Integration Configuration Modal */}
      {activeIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getProviderInfo(activeIntegration).icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)]">
                    Configure {getProviderInfo(activeIntegration).name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Connect your {getProviderInfo(activeIntegration).name} account
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSaveForm}>
              <div className="p-6 space-y-4">
                {getIntegrationFields(activeIntegration)}
                
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setActiveIntegration(null)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    💾 Save & Test Connection
                  </button>
                </div>
              </div>
            </form>
          </div>
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

