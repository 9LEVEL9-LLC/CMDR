'use client';

import { useState, useEffect } from 'react';

export default function SchedulePage() {
  const [scheduleRequests, setScheduleRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduleRequests();
  }, []);

  const fetchScheduleRequests = async () => {
    try {
      const api = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const token = localStorage.getItem('xsourcing_token');
      
      const response = await fetch(`${api}/advisor/schedule-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.ok) {
        setScheduleRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching schedule requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (requestId: number) => {
    try {
      const api = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const token = localStorage.getItem('xsourcing_token');
      
      const response = await fetch(`${api}/advisor/schedule-requests/${requestId}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.ok) {
        // Refresh the list
        fetchScheduleRequests();
        alert('Meeting confirmed! Please send a calendar invite to the client.');
      }
    } catch (error) {
      console.error('Error confirming request:', error);
      alert('Failed to confirm meeting. Please try again.');
    }
  };

  // Build 14 days of events without mutating a base Date
  const days = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
    const items: Array<{ title: string; project: string; status?: string; type: 'call' | 'delivery' | 'other' | 'demo' }> = []

    // Sample cadence for demo purposes
    if (i % 3 === 0) items.push({ title: 'Strategist call', project: 'PRJ-1993', status: 'Scheduled', type: 'call' })
    if (i % 5 === 0) items.push({ title: 'Reporting agent v1 delivery', project: 'PRJ-2001', status: 'Target', type: 'delivery' })
    if (i % 7 === 0) items.push({ title: 'Kickoff doc review', project: 'PRJ-1980', status: 'In progress', type: 'other' })

    return { date, items }
  })

  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

  const toneClass = (type: 'call' | 'delivery' | 'other' | 'demo') => {
    switch (type) {
      case 'call':
        return 'bg-[var(--color-accent-50)]'
      case 'delivery':
        return 'bg-[var(--color-primary-50)]'
      case 'demo':
        return 'bg-green-50'
      default:
        return 'bg-[var(--color-surface-alt)]'
    }
  }

  const dotClass = (type: 'call' | 'delivery' | 'other' | 'demo') => {
    switch (type) {
      case 'call':
        return 'bg-[var(--color-accent)]'
      case 'delivery':
        return 'bg-[var(--color-primary)]'
      case 'demo':
        return 'bg-green-600'
      default:
        return 'bg-[var(--color-text-muted)]'
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">Schedule</h1>
      <p className="mt-1 text-[var(--color-text-muted)]">What's in flight and when it lands. Calendar view shows starts and completions.</p>

      {/* Schedule Requests Section */}
      {scheduleRequests.length > 0 && (
        <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-card">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
            Pending Schedule Requests ({scheduleRequests.length})
          </h2>
          <div className="space-y-3">
            {scheduleRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 p-4"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-600"></span>
                    <div className="font-semibold text-[var(--color-text)]">
                      {request.time_slot}
                    </div>
                  </div>
                  {request.client_name && (
                    <div className="text-sm text-[var(--color-text-muted)]">
                      Client: {request.client_name} ({request.client_email})
                    </div>
                  )}
                  {request.meeting_description && (
                    <div className="mt-2 whitespace-pre-wrap rounded border border-green-200 bg-white p-2 text-sm text-[var(--color-text)]">
                      {request.meeting_description}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Requested: {new Date(request.created_at).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleConfirm(request.id)}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {days.map((d, idx) => (
          <div key={idx} className="rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-card">
            <div className="mb-2 font-semibold">{fmt(d.date)}</div>
            <ul className="space-y-2">
              {d.items.length === 0 ? (
                <li className="text-xs text-[var(--color-text-muted)]">No events</li>
              ) : (
                d.items.map((it, i) => (
                  <li key={i} className={`flex items-start gap-2 rounded-md border border-[var(--color-border)] p-2 text-xs ${toneClass(it.type)}`}>
                    <span className={`mt-1 inline-block h-2 w-2 rounded-full ${dotClass(it.type)}`}></span>
                    <div>
                      <div className="font-medium text-[var(--color-text)]">{it.title}</div>
                      <div className="text-[var(--color-text-muted)]">{it.project}{it.status ? ` · ${it.status}` : ''}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}


