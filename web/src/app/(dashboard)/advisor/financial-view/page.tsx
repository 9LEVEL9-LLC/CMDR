"use client"
import { useEffect, useMemo, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from "next/link"

type ForecastPeriod = {
  period: string
  month: number
  year: number
  contracted: number
  pipeline: number
  likely: number
  breakdown: {
    clients: number
    likely_close: number
    warm: number
    introduction: number
  }
}

type Company = {
  id: number
  name: string
  company_name?: string
  client_type: 'client' | 'prospect'
  prospect_stage?: 'introduction' | 'warm' | 'likely_close' | null
}

export default function FinancialViewPage() {
  const [forecast, setForecast] = useState<ForecastPeriod[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [view, setView] = useState<'contracted' | 'pipeline' | 'likely'>('likely')
  
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const authHeaders = useMemo<HeadersInit | undefined>(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("xsourcing_token") : null
    return t ? { Authorization: `Bearer ${t}` } : undefined
  }, [])

  useEffect(() => {
    loadForecast()
  }, [])

  const loadForecast = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${api}/advisor/financial-forecast`, { 
        headers: authHeaders 
      })
      const data = await res.json()
      
      console.log('📊 Financial Forecast API Response:', data)
      console.log('📈 Forecast data:', data.forecast)
      console.log('🏢 Companies data:', data.companies)
      
      if (data.ok) {
        setForecast(data.forecast || [])
        setCompanies(data.companies || [])
      } else {
        setError(data.error || 'Failed to load forecast')
      }
    } catch (error) {
      console.error('Error loading forecast:', error)
      setError('Failed to load financial forecast')
    } finally {
      setLoading(false)
    }
  }

  // Filter to show 6 months starting from current month (inclusive)
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-12 (October = 10)
  
  const filteredForecast = forecast.filter(p => {
    // Include current month through next 5 months (6 total)
    // Oct 2025 -> Show Oct 2025, Nov 2025, Dec 2025, Jan 2026, Feb 2026, Mar 2026
    const periodDate = new Date(p.year, p.month - 1, 1)
    const startDate = new Date(currentYear, currentMonth - 1, 1) // Start of current month
    const endDate = new Date(currentYear, currentMonth - 1 + 6, 1) // 6 months from start
    
    return periodDate >= startDate && periodDate < endDate
  })
  
  // Calculate summary metrics from filtered data
  const totalContracted = filteredForecast.reduce((sum, p) => sum + p.contracted, 0)
  const totalPipeline = filteredForecast.reduce((sum, p) => sum + p.pipeline, 0)
  const totalLikely = filteredForecast.reduce((sum, p) => sum + p.likely, 0)
  
  const avgMonthlyContracted = filteredForecast.length > 0 ? totalContracted / filteredForecast.length : 0
  const avgMonthlyPipeline = filteredForecast.length > 0 ? totalPipeline / filteredForecast.length : 0
  const avgMonthlyLikely = filteredForecast.length > 0 ? totalLikely / filteredForecast.length : 0

  const clientCount = companies.filter(c => c.client_type === 'client').length
  const prospectCount = companies.filter(c => c.client_type === 'prospect').length
  const likelyCloseCount = companies.filter(c => c.prospect_stage === 'likely_close').length
  const warmCount = companies.filter(c => c.prospect_stage === 'warm').length
  const introCount = companies.filter(c => c.prospect_stage === 'introduction').length

  // Format data for charts (use filtered forecast)
  const chartData = filteredForecast.map(p => {
    const breakdown = p.breakdown || { clients: 0, likely_close: 0, warm: 0, introduction: 0 }
    return {
      period: p.period,
      monthYear: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][p.month - 1]} ${p.year}`,
      contracted: p.contracted || 0,
      pipeline: p.pipeline || 0,
      likely: p.likely || 0,
      clients: breakdown.clients || 0,
      likelyClose: breakdown.likely_close || 0, // Note: backend uses snake_case
      warm: breakdown.warm || 0, // Full value for pipeline view
      warmWeighted: (breakdown.warm || 0) * 0.5, // Weighted for likely view
      introduction: breakdown.introduction || 0, // Full value for pipeline view
      introWeighted: (breakdown.introduction || 0) * 0.2 // Weighted for likely view
    }
  })
  
  console.log('📊 Chart data formatted:', chartData)
  console.log('📈 Total contracted:', totalContracted, 'Total pipeline:', totalPipeline, 'Total likely:', totalLikely)
  if (chartData.length > 0) {
    console.log('🔍 First month data sample:', chartData[0])
    console.log('🔍 Data keys available:', Object.keys(chartData[0]))
    console.log('🎯 Current view:', view)
    console.log('📊 First month chart values:')
    console.log('   - clients:', chartData[0].clients)
    console.log('   - likelyClose:', chartData[0].likelyClose)
    console.log('   - warm:', chartData[0].warm)
    console.log('   - warmWeighted:', chartData[0].warmWeighted)
    console.log('   - introduction:', chartData[0].introduction)
    console.log('   - introWeighted:', chartData[0].introWeighted)
  }

  // Get current view data
  const getViewValue = (period: ForecastPeriod) => {
    switch (view) {
      case 'contracted': return period.contracted
      case 'pipeline': return period.pipeline
      case 'likely': return period.likely
      default: return period.likely
    }
  }

  const currentTotal = view === 'contracted' ? totalContracted : view === 'pipeline' ? totalPipeline : totalLikely
  const currentAvg = view === 'contracted' ? avgMonthlyContracted : view === 'pipeline' ? avgMonthlyPipeline : avgMonthlyLikely

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-400">Loading financial forecast...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Financial Forecast</h1>
          <p className="text-gray-400 mt-1">Revenue projections and pipeline analysis</p>
        </div>
        
        {/* View Selector */}
        <div className="flex gap-2 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setView('contracted')}
            className={`px-4 py-2 rounded ${view === 'contracted' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Contracted Only
          </button>
          <button
            onClick={() => setView('pipeline')}
            className={`px-4 py-2 rounded ${view === 'pipeline' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Full Pipeline
          </button>
          <button
            onClick={() => setView('likely')}
            className={`px-4 py-2 rounded ${view === 'likely' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Likely Forecast
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Total Revenue ({view === 'contracted' ? 'Contracted' : view === 'pipeline' ? 'Pipeline' : 'Likely'})</div>
          <div className="text-3xl font-bold">${currentTotal.toLocaleString()}</div>
          <div className="text-xs opacity-75 mt-2">{filteredForecast.length} months projected</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Average Monthly</div>
          <div className="text-3xl font-bold">${currentAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="text-xs opacity-75 mt-2">Per month average</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Active Clients</div>
          <div className="text-3xl font-bold">{clientCount}</div>
          <div className="text-xs opacity-75 mt-2">${(totalContracted / forecast.length / clientCount || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} avg per client</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Active Prospects</div>
          <div className="text-3xl font-bold">{prospectCount}</div>
          <div className="text-xs opacity-75 mt-2">{likelyCloseCount} likely close, {warmCount} warm, {introCount} intro</div>
        </div>
      </div>

      {/* Revenue Forecast Chart */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {view === 'contracted' ? 'Contracted Revenue' : view === 'pipeline' ? 'Full Pipeline Forecast' : 'Weighted Pipeline Breakdown'}
        </h2>
        
        {/* Legend */}
        <div className="mb-4 flex gap-4 text-sm text-gray-400 flex-wrap">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            Contracted (100%)
          </span>
          {view !== 'contracted' && (
            <>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                Likely Close ({view === 'pipeline' ? '100%' : '100%'})
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded"></div>
                Warm ({view === 'pipeline' ? '100%' : '50%'})
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded"></div>
                Introduction ({view === 'pipeline' ? '100%' : '20%'})
              </span>
            </>
          )}
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="monthYear" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#F3F4F6' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Bar dataKey="clients" stackId="stack1" fill="#3B82F6" name="Contracted" />
            <Bar dataKey="likelyClose" stackId="stack1" fill="#10B981" name="Likely Close" />
            <Bar dataKey={view === 'likely' ? 'warmWeighted' : 'warm'} stackId="stack1" fill="#F59E0B" name={view === 'likely' ? 'Warm (50%)' : 'Warm'} />
            <Bar dataKey={view === 'likely' ? 'introWeighted' : 'introduction'} stackId="stack1" fill="#EF4444" name={view === 'likely' ? 'Introduction (20%)' : 'Introduction'} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Company List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Companies Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Clients */}
          <div>
            <h3 className="text-lg font-medium text-green-400 mb-3">Clients ({clientCount})</h3>
            <div className="space-y-2">
              {companies.filter(c => c.client_type === 'client').map(company => (
                <Link 
                  key={company.id} 
                  href={`/advisor/clients/${company.id}`}
                  className="block bg-gray-700 rounded p-3 hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="font-medium text-white">{company.company_name || company.name}</div>
                  {company.company_name && company.name && (
                    <div className="text-sm text-gray-400">{company.name}</div>
                  )}
                </Link>
              ))}
              {clientCount === 0 && (
                <div className="text-gray-500 text-sm">No active clients</div>
              )}
            </div>
          </div>
          
          {/* Prospects */}
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-3">Prospects ({prospectCount})</h3>
            <div className="space-y-2">
              {companies.filter(c => c.client_type === 'prospect').map(company => (
                <Link 
                  key={company.id}
                  href={`/advisor/clients/${company.id}`}
                  className="block bg-gray-700 rounded p-3 hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{company.company_name || company.name}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      company.prospect_stage === 'likely_close' ? 'bg-green-600/20 text-green-400' :
                      company.prospect_stage === 'warm' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-orange-600/20 text-orange-400'
                    }`}>
                      {company.prospect_stage === 'likely_close' ? 'Likely Close' :
                       company.prospect_stage === 'warm' ? 'Warm' : 'Introduction'}
                    </span>
                  </div>
                  {company.company_name && company.name && (
                    <div className="text-sm text-gray-400">{company.name}</div>
                  )}
                </Link>
              ))}
              {prospectCount === 0 && (
                <div className="text-gray-500 text-sm">No active prospects</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

