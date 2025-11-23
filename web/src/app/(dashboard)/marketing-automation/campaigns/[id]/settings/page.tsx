"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Integration {
  id: number
  provider: string
  is_connected: boolean
  is_active: boolean
  health_status: string
  last_sync: string | null
}

export default function CampaignSettingsPage() {
  const params = useParams()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null)

  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const campaignId = params.id

  useEffect(() => {
    fetchIntegrations()
  }, [campaignId])

  const fetchIntegrations = async () => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${campaignId}/integrations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.ok) {
        setIntegrations(data.integrations || [])
      }
    } catch (error) {
      console.error("Error fetching integrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProviderInfo = (provider: string) => {
    const providers: Record<string, any> = {
      apollo: { name: 'Apollo.io', icon: '🎯', color: 'blue' },
      substack: { name: 'Substack', icon: '📰', color: 'purple' },
      sendgrid: { name: 'SendGrid', icon: '✉️', color: 'blue' },
      claude: { name: 'Claude AI', icon: '🤖', color: 'orange' },
      pinecone: { name: 'Pinecone', icon: '🔍', color: 'green' },
      stripe: { name: 'Stripe', icon: '💳', color: 'indigo' },
      calendly: { name: 'Calendly', icon: '📅', color: 'cyan' },
    }
    return providers[provider] || { name: provider, icon: '🔌', color: 'gray' }
  }

  const saveIntegration = async (provider: string, apiKey: string, apiSecret?: string, additionalConfig?: any) => {
    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns/${campaignId}/integrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          provider,
          api_key: apiKey,
          api_secret: apiSecret || '',
          additional_config: additionalConfig || {}
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
                placeholder="Your Substack API key"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Optional: For advanced features like auto-sync
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
                From Email
              </label>
              <input
                type="email"
                id={`${provider}-from-email`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="noreply@yourdomain.com"
              />
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
                Get your API key from https://console.anthropic.com
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
                Environment
              </label>
              <input
                type="text"
                id={`${provider}-environment`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="us-east-1-aws"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Index Name
              </label>
              <input
                type="text"
                id={`${provider}-index`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="newsletter-content"
              />
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
                placeholder="sk_live_xxxxxxxxxxxxxxxxxx"
                required
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Use test key (sk_test_) for testing
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Publishable Key
              </label>
              <input
                type="text"
                id={`${provider}-publishable`}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="pk_live_xxxxxxxxxxxxxxxxxx"
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

  const handleSaveIntegration = () => {
    if (!activeIntegration) return
    
    const apiKeyInput = document.getElementById(`${activeIntegration}-api-key`) as HTMLInputElement
    const apiSecretInput = document.getElementById(`${activeIntegration}-api-secret`) as HTMLInputElement
    
    // Gather additional fields based on provider
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
    
    if (!apiKeyInput?.value) {
      alert('Please enter an API key')
      return
    }
    
    saveIntegration(
      activeIntegration,
      apiKeyInput.value,
      apiSecretInput?.value,
      additionalConfig
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Campaign Settings</h2>
        <p className="text-[var(--color-text-muted)] mt-1">
          Configure integrations and campaign-specific settings
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['apollo', 'substack', 'sendgrid', 'claude', 'pinecone', 'stripe'].map((provider) => {
          const info = getProviderInfo(provider)
          const integration = integrations.find(i => i.provider === provider)
          
          return (
            <div key={provider} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">{info.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {integration?.is_connected ? (
                        <span className="text-green-600">Connected</span>
                      ) : (
                        <span className="text-gray-600">Not Connected</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveIntegration(provider)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    integration?.is_connected
                      ? 'bg-[var(--color-surface-alt)] text-[var(--color-text)] hover:bg-gray-300'
                      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-700)]'
                  }`}
                >
                  {integration?.is_connected ? 'Edit' : 'Connect'}
                </button>
              </div>
              
              {integration?.last_sync && (
                <div className="text-xs text-[var(--color-text-muted)]">
                  Last synced: {new Date(integration.last_sync).toLocaleString()}
                </div>
              )}
            </div>
          )
        })}
      </div>

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
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSaveIntegration()
            }}>
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
    </div>
  )
}

