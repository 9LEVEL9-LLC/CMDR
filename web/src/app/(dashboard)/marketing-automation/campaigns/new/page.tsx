"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    campaign_name: "",
    campaign_description: "",
    target_subscribers: 100000,
    target_open_rate: 40,
    target_conversion_rate: 3,
    target_ranking: 10,
    monthly_budget: 5000,
    total_investment: 45000,
    timeline_months: 3,
    monthly_payment: 15000
  })

  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("xsourcing_token")
      const res = await fetch(`${api}/marketing-automation/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.ok) {
        router.push(`/marketing-automation/campaigns/${data.campaign.id}`)
      } else {
        alert("Failed to create campaign: " + data.error)
      }
    } catch (error) {
      console.error("Error creating campaign:", error)
      alert("Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Create New Campaign</h2>
        <p className="text-[var(--color-text-muted)] mt-1">Set up your newsletter growth campaign</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.campaign_name}
                onChange={(e) => setFormData({ ...formData, campaign_name: e.target.value })}
                placeholder="e.g., AI Insights Newsletter Growth"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.campaign_description}
                onChange={(e) => setFormData({ ...formData, campaign_description: e.target.value })}
                placeholder="Brief description of your campaign goals and audience"
              />
            </div>
          </div>
        </div>

        {/* Goal Metrics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Goal Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Target Subscribers
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.target_subscribers}
                onChange={(e) => setFormData({ ...formData, target_subscribers: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Target Open Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.target_open_rate}
                onChange={(e) => setFormData({ ...formData, target_open_rate: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Target Conversion Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.target_conversion_rate}
                onChange={(e) => setFormData({ ...formData, target_conversion_rate: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Target Ranking
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.target_ranking}
                onChange={(e) => setFormData({ ...formData, target_ranking: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Budget & Investment */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Budget & Investment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Monthly Budget ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.monthly_budget}
                onChange={(e) => setFormData({ ...formData, monthly_budget: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Total Investment ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.total_investment}
                onChange={(e) => setFormData({ ...formData, total_investment: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Timeline (Months)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.timeline_months}
                onChange={(e) => setFormData({ ...formData, timeline_months: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Monthly Payment ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={formData.monthly_payment}
                onChange={(e) => setFormData({ ...formData, monthly_payment: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-[var(--color-border)] rounded-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  )
}

