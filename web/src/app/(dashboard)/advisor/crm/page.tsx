"use client"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Company = {
  id: number
  name: string
  email: string
  company_name?: string
  website_url?: string
  phone?: string
  client_type: 'client' | 'prospect'
  prospect_stage?: 'introduction' | 'warm' | 'likely_close' | null
  created_at: string
  converted_to_client_at?: string
}

export default function CRMPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [filter, setFilter] = useState<'client' | 'prospect'>('prospect')
  const [error, setError] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [loading, setLoading] = useState(true)
  
  // Add client dialog state
  const [addClientOpen, setAddClientOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [clientType, setClientType] = useState<'client' | 'prospect'>('prospect')
  const [prospectStage, setProspectStage] = useState<string>('introduction')
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const authHeaders = useMemo<HeadersInit | undefined>(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("xsourcing_token") : null
    return t ? { Authorization: `Bearer ${t}` } : undefined
  }, [])

  useEffect(() => {
    loadCompanies()
  }, [api, authHeaders])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${api}/advisor/crm/companies`, { headers: authHeaders })
      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to load companies')
      
      setCompanies(data.companies || [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load companies')
    } finally {
      setLoading(false)
    }
  }

  const updateCompanyStatus = async (companyId: number, clientType: 'client' | 'prospect', prospectStage?: string) => {
    try {
      const response = await fetch(`${api}/advisor/clients/${companyId}/crm-status`, {
        method: 'PUT',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_type: clientType,
          prospect_stage: prospectStage || null
        })
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to update status')
      
      setSuccessMessage('Status updated successfully')
      setTimeout(() => setSuccessMessage(""), 2000)
      
      // Reload companies
      loadCompanies()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update status')
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleDragStart = (e: React.DragEvent, companyId: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', companyId.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, newStage: 'introduction' | 'warm' | 'likely_close') => {
    e.preventDefault()
    const companyId = parseInt(e.dataTransfer.getData('text/plain'))
    
    // Find the company
    const company = companies.find(c => c.id === companyId)
    if (!company || company.prospect_stage === newStage) return
    
    // Update the stage
    await updateCompanyStatus(companyId, 'prospect', newStage)
  }

  const openAddClient = () => {
    setName('')
    setEmail('')
    setUsername('')
    setPassword('')
    setCompanyName('')
    setWebsiteUrl('')
    setClientType('prospect')
    setProspectStage('introduction') // Default to introduction stage
    setError('')
    setAddClientOpen(true)
  }

  const submitAddClient = async () => {
    // Validate required fields
    if (!name || !email || !username || !password) {
      setError('Please fill in all required fields (name, email, username, password)')
      return
    }
    
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`${api}/advisor/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(authHeaders || {}) },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          companyName: companyName || undefined,
          websiteUrl: websiteUrl || undefined,
          clientType: clientType,
          prospectStage: (clientType === 'prospect' && prospectStage) ? prospectStage : undefined
        })
      }).then(r => r.json())
      
      if (!res.ok) throw new Error(res.error || 'Failed creating company')
      
      setAddClientOpen(false)
      setSuccessMessage('Company added successfully!')
      setTimeout(() => setSuccessMessage(""), 3000)
      
      // Reload companies
      loadCompanies()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed creating company')
    } finally {
      setSaving(false)
    }
  }

  const getProspectStageColor = (stage?: string | null) => {
    switch (stage) {
      case 'introduction': return 'bg-yellow-100 text-yellow-700'
      case 'warm': return 'bg-orange-100 text-orange-700'
      case 'likely_close': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProspectStageLabel = (stage?: string | null) => {
    switch (stage) {
      case 'introduction': return 'Introduction'
      case 'warm': return 'Warm'
      case 'likely_close': return 'Likely Close'
      default: return 'No Stage'
    }
  }

  const getProspectProgress = (stage?: string | null): number => {
    switch (stage) {
      case 'introduction': return 33
      case 'warm': return 66
      case 'likely_close': return 100
      default: return 0
    }
  }

  const clients = companies.filter(c => c.client_type === 'client')
  const prospects = companies.filter(c => c.client_type === 'prospect')
  
  // Group prospects by stage (prospects without a stage default to 'introduction')
  const prospectsByStage = {
    introduction: prospects.filter(p => !p.prospect_stage || p.prospect_stage === 'introduction'),
    warm: prospects.filter(p => p.prospect_stage === 'warm'),
    likely_close: prospects.filter(p => p.prospect_stage === 'likely_close')
  }

  if (loading) return <div className="text-center py-8">Loading CRM...</div>

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">CRM</h1>
          <p className="text-[var(--color-text-muted)]">Manage companies, clients, and prospects</p>
        </div>
        <button onClick={openAddClient} className="btn-primary">+ Add Company</button>
      </header>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {successMessage && (
        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{successMessage}</div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
          <div className="text-3xl font-bold text-blue-600">{companies.length}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Total Companies</div>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
          <div className="text-3xl font-bold text-green-600">{clients.length}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Active Clients</div>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
          <div className="text-3xl font-bold text-orange-600">{prospects.length}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Prospects</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border)]">
        <button
          onClick={() => setFilter('client')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            filter === 'client'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          Clients ({clients.length})
        </button>
        <button
          onClick={() => setFilter('prospect')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            filter === 'prospect'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          Prospects ({prospects.length})
        </button>
      </div>

      {/* Companies List - Show Kanban for Prospects, Table for Others */}
      {filter === 'prospect' ? (
        /* Kanban Board for Prospects */
        <div className="space-y-4">
          {/* Kanban Columns */}
          <div className="grid grid-cols-3 gap-4">
            {/* Introduction Column */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'introduction')}
              className="rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-4 min-h-[400px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900">Introduction</h3>
                  <p className="text-xs text-yellow-700">Initial contact stage</p>
                </div>
                <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-bold text-yellow-900">
                  {prospectsByStage.introduction.length}
                </span>
              </div>
              <div className="space-y-3">
                {prospectsByStage.introduction.map(prospect => (
                  <div 
                    key={prospect.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, prospect.id)}
                    className="cursor-move rounded-lg border border-yellow-300 bg-white p-3 shadow-sm hover:shadow-md transition"
                  >
                    <Link 
                      href={`/advisor/clients/${prospect.id}`}
                      className="block"
                    >
                      <div className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]">
                        {prospect.company_name || prospect.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-text-muted)]">{prospect.name}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{prospect.email}</div>
                    </Link>
                  </div>
                ))}
                {prospectsByStage.introduction.length === 0 && (
                  <div className="py-8 text-center text-sm text-yellow-700">
                    Drag prospects here
                  </div>
                )}
              </div>
            </div>

            {/* Warm Column */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'warm')}
              className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-4 min-h-[400px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-orange-900">Warm</h3>
                  <p className="text-xs text-orange-700">Engaged prospects</p>
                </div>
                <span className="rounded-full bg-orange-200 px-3 py-1 text-sm font-bold text-orange-900">
                  {prospectsByStage.warm.length}
                </span>
              </div>
              <div className="space-y-3">
                {prospectsByStage.warm.map(prospect => (
                  <div 
                    key={prospect.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, prospect.id)}
                    className="cursor-move rounded-lg border border-orange-300 bg-white p-3 shadow-sm hover:shadow-md transition"
                  >
                    <Link 
                      href={`/advisor/clients/${prospect.id}`}
                      className="block"
                    >
                      <div className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]">
                        {prospect.company_name || prospect.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-text-muted)]">{prospect.name}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{prospect.email}</div>
                    </Link>
                  </div>
                ))}
                {prospectsByStage.warm.length === 0 && (
                  <div className="py-8 text-center text-sm text-orange-700">
                    Drag prospects here
                  </div>
                )}
              </div>
            </div>

            {/* Likely Close Column */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'likely_close')}
              className="rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-4 min-h-[400px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Likely Close</h3>
                  <p className="text-xs text-green-700">Ready to close</p>
                </div>
                <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-bold text-green-900">
                  {prospectsByStage.likely_close.length}
                </span>
              </div>
              <div className="space-y-3">
                {prospectsByStage.likely_close.map(prospect => (
                  <div 
                    key={prospect.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, prospect.id)}
                    className="cursor-move rounded-lg border border-green-300 bg-white p-3 shadow-sm hover:shadow-md transition"
                  >
                    <Link 
                      href={`/advisor/clients/${prospect.id}`}
                      className="block"
                    >
                      <div className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]">
                        {prospect.company_name || prospect.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-text-muted)]">{prospect.name}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{prospect.email}</div>
                    </Link>
                  </div>
                ))}
                {prospectsByStage.likely_close.length === 0 && (
                  <div className="py-8 text-center text-sm text-green-700">
                    Drag prospects here
                  </div>
                )}
              </div>
            </div>
          </div>

          {prospects.length === 0 && (
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center text-[var(--color-text-muted)]">
              No prospects yet. Add a prospect to get started.
            </div>
          )}
        </div>
      ) : (
        /* Table View for Clients */
        <div className="rounded-xl border border-[var(--color-border)] bg-white shadow-card">
          {clients.length > 0 ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4 border-b border-[var(--color-border)] p-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                <div className="col-span-2">Company</div>
                <div>Contact</div>
                <div className="text-right">Status</div>
              </div>
              <div className="divide-y">
                {clients.map(company => (
                  <div key={company.id} className="grid grid-cols-4 items-center gap-4 p-4 text-sm hover:bg-[var(--color-surface-alt)] transition">
                    <div className="col-span-2">
                      <Link 
                        href={`/advisor/clients/${company.id}`}
                        className="font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
                      >
                        {company.company_name || company.name}
                      </Link>
                    </div>
                    <div className="text-[var(--color-text-muted)]">
                      <div>{company.name}</div>
                      <a href={`mailto:${company.email}`} className="text-xs text-[var(--color-primary)] hover:underline">
                        {company.email}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Client
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[var(--color-text-muted)]">
              No clients yet. Add a client to get started.
            </div>
          )}
        </div>
      )}

      {/* Add Company Dialog */}
      <Dialog open={addClientOpen} onOpenChange={setAddClientOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <p className="text-sm text-[var(--color-text-muted)]">Create a new company (client or prospect). You will be automatically assigned as their advisor.</p>
          </DialogHeader>
          
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="grid grid-cols-2 items-center gap-2">
              <label className="text-[var(--color-text-muted)]">Full name *</label>
              <input 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
              />
              
              <label className="text-[var(--color-text-muted)]">Email *</label>
              <input 
                type="email" 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="john@company.com"
              />
              
              <label className="text-[var(--color-text-muted)]">Username *</label>
              <input 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                placeholder="johndoe"
              />
              
              <label className="text-[var(--color-text-muted)]">Password *</label>
              <input 
                type="password" 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              
              <label className="text-[var(--color-text-muted)]">Company</label>
              <input 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={companyName} 
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
              />
              
              <label className="text-[var(--color-text-muted)]">Website URL</label>
              <input 
                className="rounded-md border border-[var(--color-border)] px-3 py-2" 
                value={websiteUrl} 
                onChange={e => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
              />
              
              <label className="text-[var(--color-text-muted)]">Type *</label>
              <select 
                className="rounded-md border border-[var(--color-border)] px-3 py-2"
                value={clientType}
                onChange={e => {
                  setClientType(e.target.value as 'client' | 'prospect')
                  if (e.target.value === 'client') {
                    setProspectStage('')
                  }
                }}
              >
                <option value="client">Client (Active)</option>
                <option value="prospect">Prospect</option>
              </select>
              
              {clientType === 'prospect' && (
                <>
                  <label className="text-[var(--color-text-muted)]">Prospect Stage</label>
                  <select 
                    className="rounded-md border border-[var(--color-border)] px-3 py-2"
                    value={prospectStage}
                    onChange={e => setProspectStage(e.target.value)}
                  >
                    <option value="introduction">Introduction</option>
                    <option value="warm">Warm</option>
                    <option value="likely_close">Likely Close</option>
                  </select>
                </>
              )}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">* Required fields</div>
          </div>
          
          <DialogFooter>
            <button onClick={() => setAddClientOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={submitAddClient} disabled={saving} className="btn-primary">
              {saving ? 'Creating…' : `Create ${clientType === 'client' ? 'Client' : 'Prospect'}`}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

