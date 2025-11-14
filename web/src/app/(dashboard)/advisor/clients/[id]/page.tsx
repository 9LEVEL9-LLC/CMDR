"use client"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import FinancialRecordsEditor from "@/components/FinancialRecordsEditor"

type Client = {
  id: number
  name: string
  email: string
  company_name?: string
  website_url?: string
  phone?: string
  client_type?: 'client' | 'prospect'
  prospect_stage?: 'introduction' | 'warm' | 'likely_close' | null
  converted_to_client_at?: string
}

type Credential = {
  id: number
  name: string
  type: 'text' | 'file'
  value?: string
  file_name?: string
  is_predefined: boolean
}

type Project = {
  id: number
  name: string
  status: string
  eta: string | null
}

type ClientDocument = {
  id: number
  file_name: string
  file_type: string
  file_size: number
  original_name: string
  description?: string
  uploaded_at: string
}

type Proposal = {
  id: number
  title: string
  description?: string
  proposal_type: 'proposal' | 'scope' | 'contract' | 'agreement' | 'other'
  proposal_url: string
  status: 'draft' | 'sent' | 'viewed' | 'signed' | 'declined'
  sent_at?: string
  created_at: string
  updated_at: string
  proposal_views: number
  agreement_views: number
  download_clicks: number
  last_viewed_at?: string
}

type ClientNote = {
  id: number
  note: string
  advisor_name: string
  created_at: string
  updated_at: string
}

export default function AdvisorClientDetailPage() {
  const params = useParams()
  const clientId = Number(params.id)
  const [client, setClient] = useState<Client | null>(null)
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [documents, setDocuments] = useState<ClientDocument[]>([])
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [notes, setNotes] = useState<ClientNote[]>([])
  const [newNote, setNewNote] = useState<string>('')
  const [error, setError] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [fileDescription, setFileDescription] = useState("")
  const [showAddProposal, setShowAddProposal] = useState(false)
  const [editingCompanyInfo, setEditingCompanyInfo] = useState(false)
  const [companyInfoForm, setCompanyInfoForm] = useState({
    name: '',
    email: '',
    company_name: '',
    website_url: '',
    phone: ''
  })
  const [proposalForm, setProposalForm] = useState({
    title: '',
    description: '',
    proposal_type: 'proposal' as Proposal['proposal_type'],
    proposal_url: '',
    status: 'draft' as Proposal['status']
  })
  const fileInputRef = useState<React.RefObject<HTMLInputElement>>(
    () => ({ current: null } as React.RefObject<HTMLInputElement>)
  )[0]
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const authHeaders = useMemo<HeadersInit | undefined>(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("xsourcing_token") : null
    return t ? { Authorization: `Bearer ${t}` } : undefined
  }, [])

  const activeProjects = useMemo(() => projects.filter(p => p.status !== 'Completed'), [projects])
  const finishedProjects = useMemo(() => projects.filter(p => p.status === 'Completed'), [projects])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        
        // Fetch client details
        const clientRes = await fetch(`${api}/advisor/clients/${clientId}`, { headers: authHeaders }).then(r => r.json())
        if (!clientRes.ok) throw new Error(clientRes.error || 'Failed loading client details')
        setClient(clientRes.client)
        
        // Initialize company info form with client data
        setCompanyInfoForm({
          name: clientRes.client.name || '',
          email: clientRes.client.email || '',
          company_name: clientRes.client.company_name || '',
          website_url: clientRes.client.website_url || '',
          phone: clientRes.client.phone || ''
        })
        
        // Fetch client credentials
        const credRes = await fetch(`${api}/advisor/clients/${clientId}/credentials`, { headers: authHeaders }).then(r => r.json())
        if (credRes.ok) {
          setCredentials(credRes.credentials)
        }
        
        // Fetch client projects
        const projRes = await fetch(`${api}/advisor/clients/${clientId}/projects`, { headers: authHeaders }).then(r => r.json())
        if (!projRes.ok) throw new Error(projRes.error || 'Failed loading projects')
        setProjects(projRes.projects)
        
        // Fetch client documents
        const docsRes = await fetch(`${api}/advisor/clients/${clientId}/documents`, { headers: authHeaders }).then(r => r.json())
        if (docsRes.ok) {
          setDocuments(docsRes.documents || [])
        }
        
        // Fetch client proposals
        const proposalsRes = await fetch(`${api}/advisor/clients/${clientId}/proposals`, { headers: authHeaders }).then(r => r.json())
        if (proposalsRes.ok) {
          setProposals(proposalsRes.proposals || [])
        }
        
        // Fetch client notes
        const notesRes = await fetch(`${api}/advisor/clients/${clientId}/notes`, { headers: authHeaders }).then(r => r.json())
        if (notesRes.ok) {
          setNotes(notesRes.notes || [])
        }
        
      } catch (e: unknown) { 
        setError(e instanceof Error ? e.message : 'Failed loading client details') 
      } finally {
        setLoading(false)
      }
    })()
  }, [api, authHeaders, clientId])

  const copyToClipboard = async (text: string, credName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setSuccessMessage(`Copied ${credName} to clipboard`)
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch {
      setError('Failed to copy to clipboard')
      setTimeout(() => setError(""), 2000)
    }
  }

  const downloadCredentialFile = async (credId: number, fileName: string) => {
    try {
      const response = await fetch(`${api}/advisor/credentials/${clientId}/${credId}/download`, {
        headers: authHeaders
      })
      if (!response.ok) throw new Error('Failed to download file')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed downloading file')
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    setError("")
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (fileDescription) {
        formData.append('description', fileDescription)
      }

      const response = await fetch(`${api}/advisor/clients/${clientId}/documents`, {
        method: 'POST',
        headers: {
          Authorization: authHeaders?.Authorization as string
        },
        body: formData
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to upload file')
      
      // Add to documents list
      setDocuments(prev => [data.document, ...prev])
      setSuccessMessage(`Successfully uploaded ${file.name}`)
      setFileDescription("")
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to upload file')
      setTimeout(() => setError(""), 3000)
    } finally {
      setUploadingFile(false)
    }
  }

  const downloadDocument = async (docId: number, fileName: string) => {
    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/documents/${docId}/download`, {
        headers: authHeaders
      })
      
      if (!response.ok) throw new Error('Failed to download file')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setSuccessMessage(`Downloaded ${fileName}`)
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to download file')
      setTimeout(() => setError(""), 3000)
    }
  }

  const deleteDocument = async (docId: number, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"? This cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/documents/${docId}`, {
        method: 'DELETE',
        headers: authHeaders
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to delete file')
      
      // Remove from documents list
      setDocuments(prev => prev.filter(d => d.id !== docId))
      setSuccessMessage(`Deleted ${fileName}`)
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete file')
      setTimeout(() => setError(""), 3000)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (fileType: string): string => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('sheet') || fileType.includes('excel')) return '📊'
    if (fileType.includes('image')) return '🖼️'
    if (fileType.includes('video')) return '🎥'
    if (fileType.includes('audio')) return '🎵'
    if (fileType.includes('zip') || fileType.includes('archive')) return '📦'
    return '📎'
  }

  const getProspectProgress = (stage?: string | null): number => {
    switch (stage) {
      case 'introduction': return 33
      case 'warm': return 66
      case 'likely_close': return 100
      default: return 0
    }
  }

  const getProspectStageLabel = (stage?: string | null): string => {
    switch (stage) {
      case 'introduction': return 'Introduction'
      case 'warm': return 'Warm'
      case 'likely_close': return 'Likely Close'
      default: return 'No Stage Set'
    }
  }

  const convertToClient = async () => {
    if (!confirm('Convert this prospect to an active client? This will clear the prospect stage and mark them as a client.')) {
      return
    }

    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/crm-status`, {
        method: 'PUT',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        } as HeadersInit,
        body: JSON.stringify({
          client_type: 'client'
        })
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to convert to client')
      
      // Reload client data
      const clientRes = await fetch(`${api}/advisor/clients/${clientId}`, { headers: authHeaders }).then(r => r.json())
      if (clientRes.ok) {
        setClient(clientRes.client)
      }
      
      setSuccessMessage('Successfully converted to client!')
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to convert to client')
      setTimeout(() => setError(""), 3000)
    }
  }

  const updateProspectStage = async (newStage: string) => {
    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/crm-status`, {
        method: 'PUT',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        } as HeadersInit,
        body: JSON.stringify({
          client_type: 'prospect',
          prospect_stage: newStage
        })
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to update stage')
      
      // Update local state
      setClient(prev => prev ? { ...prev, prospect_stage: newStage as any } : prev)
      
      setSuccessMessage('Prospect stage updated!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update stage')
      setTimeout(() => setError(""), 3000)
    }
  }

  const addProposal = async () => {
    try {
      if (!proposalForm.title || !proposalForm.proposal_url) {
        setError('Title and URL are required')
        setTimeout(() => setError(""), 3000)
        return
      }

      const response = await fetch(`${api}/advisor/clients/${clientId}/proposals`, {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        } as HeadersInit,
        body: JSON.stringify(proposalForm)
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to add proposal')
      
      // Add to proposals list
      setProposals(prev => [data.proposal, ...prev])
      
      // Reset form
      setProposalForm({
        title: '',
        description: '',
        proposal_type: 'proposal',
        proposal_url: '',
        status: 'draft'
      })
      setShowAddProposal(false)
      
      setSuccessMessage('Proposal added successfully!')
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to add proposal')
      setTimeout(() => setError(""), 3000)
    }
  }

  const updateProposalStatus = async (proposalId: number, newStatus: Proposal['status']) => {
    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/proposals/${proposalId}`, {
        method: 'PUT',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        } as HeadersInit,
        body: JSON.stringify({ status: newStatus })
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to update status')
      
      // Update proposals list
      setProposals(prev => prev.map(p => p.id === proposalId ? data.proposal : p))
      
      setSuccessMessage('Proposal status updated!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update status')
      setTimeout(() => setError(""), 3000)
    }
  }

  const deleteProposal = async (proposalId: number, title: string) => {
    if (!confirm(`Delete proposal "${title}"?`)) return

    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/proposals/${proposalId}`, {
        method: 'DELETE',
        headers: authHeaders
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to delete proposal')
      
      // Remove from proposals list
      setProposals(prev => prev.filter(p => p.id !== proposalId))
      
      setSuccessMessage('Proposal deleted!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete proposal')
      setTimeout(() => setError(""), 3000)
    }
  }

  const getProposalTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      proposal: 'Proposal',
      scope: 'Scope of Work',
      contract: 'Contract',
      agreement: 'Agreement',
      other: 'Other'
    }
    return labels[type] || type
  }

  const getProposalStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      sent: 'bg-blue-100 text-blue-700',
      viewed: 'bg-purple-100 text-purple-700',
      signed: 'bg-green-100 text-green-700',
      declined: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const copyTrackingUrl = async (proposalId: number) => {
    const trackingUrl = `${api.replace('/api', '')}/view/proposal/${proposalId}`
    try {
      await navigator.clipboard.writeText(trackingUrl)
      setSuccessMessage('Tracking URL copied to clipboard!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch {
      setError('Failed to copy URL')
      setTimeout(() => setError(""), 2000)
    }
  }

  const addNote = async () => {
    if (!newNote.trim()) {
      setError('Please enter a note')
      setTimeout(() => setError(""), 2000)
      return
    }

    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/notes`, {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        } as HeadersInit,
        body: JSON.stringify({ note: newNote.trim() })
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to add note')
      
      // Add to notes list
      setNotes(prev => [data.note, ...prev])
      setNewNote('')
      
      setSuccessMessage('Note added!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to add note')
      setTimeout(() => setError(""), 3000)
    }
  }

  const saveCompanyInfo = async () => {
    try {
      setError('')
      setSuccessMessage('')
      
      const response = await fetch(`${api}/advisor/clients/${clientId}/update-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(companyInfoForm)
      })
      
      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to update company information')
      
      // Update client state
      setClient(prev => prev ? { ...prev, ...companyInfoForm } : null)
      setEditingCompanyInfo(false)
      setSuccessMessage('Company information updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update company information')
      setTimeout(() => setError(''), 5000)
    }
  }
  
  const cancelEditCompanyInfo = () => {
    if (!client) return
    // Reset form to current client data
    setCompanyInfoForm({
      name: client.name || '',
      email: client.email || '',
      company_name: client.company_name || '',
      website_url: client.website_url || '',
      phone: client.phone || ''
    })
    setEditingCompanyInfo(false)
  }

  const deleteNote = async (noteId: number) => {
    if (!confirm('Delete this note?')) return

    try {
      const response = await fetch(`${api}/advisor/clients/${clientId}/notes/${noteId}`, {
        method: 'DELETE',
        headers: authHeaders
      })

      const data = await response.json()
      
      if (!data.ok) throw new Error(data.error || 'Failed to delete note')
      
      // Remove from notes list
      setNotes(prev => prev.filter(n => n.id !== noteId))
      
      setSuccessMessage('Note deleted!')
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete note')
      setTimeout(() => setError(""), 3000)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
  if (!client) return <div>Client not found</div>

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">{client.company_name || client.name}</h1>
            {client.client_type === 'prospect' ? (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">Prospect</span>
            ) : (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Client</span>
            )}
          </div>
          <p className="text-[var(--color-text-muted)]">{client.client_type === 'prospect' ? 'Prospect' : 'Company'} Details</p>
        </div>
        <div className="flex items-center gap-3">
          {client.client_type === 'prospect' && (
            <button 
              onClick={convertToClient}
              className="btn-primary"
            >
              ✓ Convert to Client
            </button>
          )}
          <Link href="/advisor" className="text-sm text-[var(--color-primary)] underline">← Back to Dashboard</Link>
        </div>
      </header>

      {successMessage && (
        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{successMessage}</div>
      )}

      {/* Prospect Progress Indicator */}
      {client.client_type === 'prospect' && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-orange-900">Prospect Status</h2>
              <p className="text-sm text-orange-800">Track the progress of this prospect through your sales pipeline</p>
            </div>
            <select
              value={client.prospect_stage || ''}
              onChange={(e) => updateProspectStage(e.target.value)}
              className="rounded-md border border-orange-300 px-3 py-2 text-sm font-medium"
            >
              <option value="">Select Stage</option>
              <option value="introduction">Introduction</option>
              <option value="warm">Warm</option>
              <option value="likely_close">Likely Close</option>
            </select>
          </div>
          
          {client.prospect_stage && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-orange-900">Current Stage:</span>
                <span className="font-semibold text-orange-800">{getProspectStageLabel(client.prospect_stage)}</span>
              </div>
              <div className="h-4 w-full rounded-full bg-orange-200">
                <div 
                  className={`h-4 rounded-full transition-all ${
                    client.prospect_stage === 'introduction' ? 'bg-yellow-500' :
                    client.prospect_stage === 'warm' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${getProspectProgress(client.prospect_stage)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-orange-700">
                <span>Introduction</span>
                <span>Warm</span>
                <span>Likely Close</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Company Profile Info */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Company Information</h2>
          {!editingCompanyInfo ? (
            <button
              onClick={() => setEditingCompanyInfo(true)}
              className="btn-secondary text-sm"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEditCompanyInfo}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveCompanyInfo}
                className="btn-primary text-sm"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {!editingCompanyInfo ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[var(--color-text-muted)]">Name:</span>
              <span className="ml-2 font-medium">{client.name}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)]">Email:</span>
              <a href={`mailto:${client.email}`} className="ml-2 text-[var(--color-primary)] underline">{client.email}</a>
            </div>
            {client.company_name && (
              <div>
                <span className="text-[var(--color-text-muted)]">Company:</span>
                <span className="ml-2 font-medium">{client.company_name}</span>
              </div>
            )}
            {client.website_url && (
              <div>
                <span className="text-[var(--color-text-muted)]">Website:</span>
                <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[var(--color-primary)] underline">{client.website_url}</a>
              </div>
            )}
            {client.phone && (
              <div>
                <span className="text-[var(--color-text-muted)]">Phone:</span>
                <a href={`tel:${client.phone}`} className="ml-2 text-[var(--color-primary)] underline">{client.phone}</a>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={companyInfoForm.name}
                  onChange={(e) => setCompanyInfoForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={companyInfoForm.email}
                  onChange={(e) => setCompanyInfoForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyInfoForm.company_name}
                  onChange={(e) => setCompanyInfoForm(prev => ({ ...prev, company_name: e.target.value }))}
                  className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={companyInfoForm.website_url}
                  onChange={(e) => setCompanyInfoForm(prev => ({ ...prev, website_url: e.target.value }))}
                  className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={companyInfoForm.phone}
                  onChange={(e) => setCompanyInfoForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Client Notes */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Notes & Messages</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Shared notes visible to all advisors</p>
        </div>

        {/* Add Note Form */}
        <div className="mb-6">
          <div className="flex gap-3">
            <textarea
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Add a note about this client..."
              rows={3}
              className="flex-1 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm resize-none"
            />
            <button
              onClick={addNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium self-start"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        {notes.length > 0 ? (
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="border border-[var(--color-border)] rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[var(--color-text)]">{note.advisor_name}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {new Date(note.created_at).toLocaleDateString()} {new Date(note.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                    title="Delete note"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-[var(--color-text)] whitespace-pre-wrap">{note.note}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm">No notes yet</p>
            <p className="text-xs mt-1">Add your first note above</p>
          </div>
        )}
      </div>

      {/* Financial Records */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <FinancialRecordsEditor clientId={clientId} clientName={client.name} />
      </div>

      {/* Proposals & Scopes */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Proposals & Scopes</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Track proposals with engagement analytics</p>
          </div>
          <button 
            onClick={() => setShowAddProposal(!showAddProposal)}
            className="btn-primary"
          >
            + Add Proposal
          </button>
        </div>

        {/* Add Proposal Form */}
        {showAddProposal && (
          <div className="mb-6 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Add New Proposal</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-blue-900 mb-1">
                    Title *
                  </label>
                  <input 
                    type="text"
                    value={proposalForm.title}
                    onChange={e => setProposalForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., AI Platform Proposal"
                    className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-900 mb-1">
                    Type
                  </label>
                  <select
                    value={proposalForm.proposal_type}
                    onChange={e => setProposalForm(prev => ({ ...prev, proposal_type: e.target.value as Proposal['proposal_type'] }))}
                    className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm"
                  >
                    <option value="proposal">Proposal</option>
                    <option value="scope">Scope of Work</option>
                    <option value="contract">Contract</option>
                    <option value="agreement">Agreement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-900 mb-1">
                  Proposal URL *
                </label>
                <input 
                  type="text"
                  value={proposalForm.proposal_url}
                  onChange={e => setProposalForm(prev => ({ ...prev, proposal_url: e.target.value }))}
                  placeholder="e.g., /public/paycile-proposal.html or https://..."
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm font-mono"
                />
                <p className="text-xs text-blue-700 mt-1">
                  Use relative path (/public/...) for files in web/public or full URL for external links
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-900 mb-1">
                  Description (optional)
                </label>
                <textarea 
                  value={proposalForm.description}
                  onChange={e => setProposalForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description..."
                  rows={2}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-900 mb-1">
                  Status
                </label>
                <select
                  value={proposalForm.status}
                  onChange={e => setProposalForm(prev => ({ ...prev, status: e.target.value as Proposal['status'] }))}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="viewed">Viewed</option>
                  <option value="signed">Signed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={addProposal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Save Proposal
                </button>
                <button 
                  onClick={() => setShowAddProposal(false)}
                  className="px-4 py-2 border border-blue-300 rounded-md hover:bg-blue-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Proposals List */}
        {proposals.length > 0 ? (
          <div className="space-y-3">
            {proposals.map(proposal => (
              <div key={proposal.id} className="border border-[var(--color-border)] rounded-lg p-4 hover:bg-[var(--color-surface-alt)] transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-[var(--color-text)]">{proposal.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getProposalStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] bg-gray-100 px-2 py-1 rounded">
                        {getProposalTypeLabel(proposal.proposal_type)}
                      </span>
                    </div>
                    {proposal.description && (
                      <p className="text-sm text-[var(--color-text-muted)] mb-2">{proposal.description}</p>
                    )}
                    <div className="text-xs text-[var(--color-text-muted)]">
                      Created {new Date(proposal.created_at).toLocaleDateString()}
                      {proposal.sent_at && ` • Sent ${new Date(proposal.sent_at).toLocaleDateString()}`}
                      {proposal.last_viewed_at && ` • Last viewed ${new Date(proposal.last_viewed_at).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>

                {/* Analytics Stats */}
                <div className="grid grid-cols-3 gap-4 mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{proposal.proposal_views || 0}</div>
                    <div className="text-xs text-gray-600">Proposal Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{proposal.agreement_views || 0}</div>
                    <div className="text-xs text-gray-600">Agreement Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{proposal.download_clicks || 0}</div>
                    <div className="text-xs text-gray-600">Download Clicks</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <a 
                    href={proposal.proposal_url.startsWith('http') ? proposal.proposal_url : proposal.proposal_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 border border-blue-300 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    View Original
                  </a>
                  <button
                    onClick={() => copyTrackingUrl(proposal.id)}
                    className="text-xs px-3 py-1 border border-purple-300 bg-purple-50 text-purple-700 rounded hover:bg-purple-100"
                  >
                    Copy Tracking URL
                  </button>
                  <select
                    value={proposal.status}
                    onChange={e => updateProposalStatus(proposal.id, e.target.value as Proposal['status'])}
                    className="text-xs px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="viewed">Viewed</option>
                    <option value="signed">Signed</option>
                    <option value="declined">Declined</option>
                  </select>
                  <button
                    onClick={() => deleteProposal(proposal.id, proposal.title)}
                    className="text-xs px-3 py-1 border border-red-300 bg-red-50 text-red-700 rounded hover:bg-red-100 ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm">No proposals yet</p>
            <p className="text-xs mt-1">Add a proposal to start tracking engagement</p>
          </div>
        )}
      </div>

      {/* Client Credentials */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-3 text-lg font-semibold">Access & Credentials</div>
        {credentials.length > 0 ? (
          <div className="space-y-3">
            {credentials.map(cred => (
              <div key={cred.id} className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--color-text-muted)]">{cred.name}:</span>
                  {cred.type === 'file' ? (
                    <button 
                      onClick={() => downloadCredentialFile(cred.id, cred.file_name || 'credential-file')}
                      className="flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-1 text-sm hover:bg-[var(--color-surface-alt)] transition"
                    >
                      📎 {cred.file_name || 'File uploaded'}
                    </button>
                  ) : cred.value ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium font-mono bg-[var(--color-surface-alt)] px-2 py-1 rounded">{cred.value}</span>
                      <button 
                        onClick={() => copyToClipboard(cred.value!, cred.name)}
                        className="rounded-md border border-[var(--color-border)] px-2 py-1 text-sm hover:bg-[var(--color-surface-alt)] transition"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">Not configured</span>
                  )}
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {cred.is_predefined ? 'System' : 'Custom'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">No credentials configured</p>
        )}
      </div>

      {/* Client Documents */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Client Documents</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Upload and manage files for this client</p>
          </div>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            {documents.length} File{documents.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Upload Section */}
        <div className="mb-6 rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">Upload Documents</h3>
              <p className="text-sm text-purple-800 mb-3">
                Share files with your client: contracts, scopes, designs, videos, images, spreadsheets, or any other files.
              </p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-purple-900 mb-1">
                    Description (optional)
                  </label>
                  <input 
                    type="text"
                    value={fileDescription}
                    onChange={e => setFileDescription(e.target.value)}
                    placeholder="e.g., Project requirements, Design mockups..."
                    className="w-full rounded-md border border-purple-300 px-3 py-2 text-sm"
                    disabled={uploadingFile}
                  />
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingFile}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap"
                >
                  {uploadingFile ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Choose File
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-purple-700 mt-2">
                All file types supported (max 100MB)
              </p>
            </div>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Documents List */}
        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between border border-[var(--color-border)] rounded-lg p-4 hover:bg-[var(--color-surface-alt)] transition">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{getFileIcon(doc.file_type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{doc.original_name}</div>
                    {doc.description && (
                      <div className="text-xs text-[var(--color-text-muted)] truncate">{doc.description}</div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-1">
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => downloadDocument(doc.id, doc.original_name)}
                    className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm hover:bg-white transition"
                    title="Download file"
                  >
                    ⬇️ Download
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id, doc.original_name)}
                    className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100 transition"
                    title="Delete file"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <div className="text-4xl mb-2">📂</div>
            <p className="text-sm">No documents uploaded yet</p>
            <p className="text-xs mt-1">Upload files to share with this client</p>
          </div>
        )}
      </div>

      {/* Client Projects */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-3 text-lg font-semibold">Active Projects</div>
        {activeProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-3 items-center gap-4 border-b border-[var(--color-border)] p-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              <div>Project</div>
              <div>ID / ETA</div>
              <div className="text-right">Status</div>
            </div>
            <div className="divide-y">
              {activeProjects.map(p => (
                <Link 
                  key={p.id} 
                  href={`/advisor/projects/${p.id}`}
                  className="grid grid-cols-3 items-center gap-4 p-4 text-sm hover:bg-[var(--color-surface-alt)] cursor-pointer transition"
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                    <div className="whitespace-nowrap w-40 truncate overflow-hidden flex-none shrink-0">PRJ-{String(p.id).padStart(4,'0')} {p.eta && `· ETA ${p.eta}`}</div>
                    <div className="h-2 w-56 flex-none shrink-0 rounded bg-[var(--color-surface-alt)]">
                      <div className="h-2 rounded bg-[var(--color-primary)]" style={{ width: `${(p.status==='Draft'?10:p.status==='Pending Advisor'?30:p.status==='In production'?60:p.status==='Waiting Client Feedback'?80:p.status==='Completed'?100:50)}%` }} />
                    </div>
                    <span className="text-xs whitespace-nowrap w-40 truncate overflow-hidden flex-none shrink-0">{p.status}</span>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      p.status === 'Draft' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="p-4 text-sm text-[var(--color-text-muted)]">No active projects.</div>
        )}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card">
        <div className="mb-3 text-lg font-semibold">Finished Projects</div>
        {finishedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-3 items-center gap-4 border-b border-[var(--color-border)] p-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              <div>Project</div>
              <div>ID / ETA</div>
              <div className="text-right">Status</div>
            </div>
            <div className="divide-y">
              {finishedProjects.map(p => (
                <Link 
                  key={p.id} 
                  href={`/advisor/projects/${p.id}`}
                  className="grid grid-cols-3 items-center gap-4 p-4 text-sm hover:bg-[var(--color-surface-alt)] cursor-pointer transition"
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[var(--color-text-muted)]">PRJ-{String(p.id).padStart(4,'0')} {p.eta && `· ETA ${p.eta}`}</div>
                  <div className="text-right">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{p.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="p-4 text-sm text-[var(--color-text-muted)]">No finished projects.</div>
        )}
      </div>
    </div>
  )
}
