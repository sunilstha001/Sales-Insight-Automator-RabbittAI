import React, { useState } from 'react'
import FileUpload from './components/FileUpload'      
import EmailInput from './components/EmailInput'      
import StatusMessage from './components/StatusMessage' 
import LoadingSpinner from './components/LoadingSpinner' 
import { Sparkles, Shield, Github, TrendingUp, Zap, MailCheck, Download, Copy, Check } from 'lucide-react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

function Home() {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [summary, setSummary] = useState(null)
  const [copied, setCopied] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      toast.error('Please select a file to upload')
      return
    }

    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('email', email)

    setLoading(true)
    setStatus({ type: 'loading', message: 'Processing your file...' })
    setSummary(null)

    try {
      console.log('📤 Sending to:', API_URL)
      
      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/upload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
        withCredentials: false
      })

      console.log(' Response:', response.data)

      if (response.data.success) {
        // Store the summary
        setSummary({
          narrative: response.data.narrative || response.data.data?.narrative,
          stats: response.data.data?.summary || response.data.summary,
          fileName: file.name
        })
        
        setStatus({ 
          type: 'success', 
          message: ' Summary generated successfully! Check your inbox and see below.' 
        })
        toast.success('Summary generated successfully!')
        setFile(null)
        setEmail('')
      }
    } catch (error) {
      console.error(' Upload error:', error)
      
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. The server is taking too long to respond.'
      } else if (error.response) {
        errorMessage = error.response.data?.error?.message || `Server error: ${error.response.status}`
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check if backend is running.'
      } else {
        errorMessage = error.message
      }
      
      setStatus({ type: 'error', message: ` ${errorMessage}` })
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (summary?.narrative) {
      navigator.clipboard.writeText(summary.narrative)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadSummary = () => {
    if (summary?.narrative) {
      const blob = new Blob([summary.narrative], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sales-summary-${new Date().toISOString().slice(0,10)}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Summary downloaded!')
    }
  }

  // Function to format narrative with proper styling
  const formatNarrative = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      // Check if line is a header (starts with ** or is ALL CAPS)
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>
      }
      // Check if line is a bullet point
      else if (line.startsWith('•') || line.startsWith('-') || line.match(/^\d+\./)) {
        return <li key={index} className="text-gray-700 ml-6 mb-2">{line}</li>
      }
      // Check if line is empty
      else if (line.trim() === '') {
        return <br key={index} />
      }
      // Regular paragraph
      else {
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Rabbit AI
                </span>
                <span className="ml-2 text-sm text-gray-500 hidden sm:inline">Sales Insight Automator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href={`${API_URL}/api-docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
              >
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">API Docs</span>
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Sales Data into
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Actionable Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your sales file, and let our AI generate a professional executive summary 
            delivered straight to your inbox in seconds.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Generate Your Insight</h2>
            <p className="text-gray-600 mt-2">Fill in the details below to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <FileUpload file={file} setFile={setFile} />
            <EmailInput email={email} setEmail={setEmail} />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-[length:200%_200%] animate-gradient text-white py-5 px-6 rounded-xl font-semibold text-lg
                       hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <LoadingSpinner />
                  <span>Processing Your File...</span>
                </div>
              ) : (
                'Generate & Send Summary'
              )}
            </button>
          </form>

          {status.message && <StatusMessage status={status} />}
        </div>

        {/*  SUMMARY DISPLAY SECTION */}
        {summary && (
          <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
                  AI-Generated Summary
                </h2>
                <p className="text-gray-600 mt-1">File: {summary.fileName}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5 text-gray-600" />}
                  <span className="text-sm font-medium text-gray-700">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadSummary}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Download</span>
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            {summary.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary.stats.totalRevenue?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-sm text-pink-600 font-medium">Total Units</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.stats.totalUnits?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.stats.totalOrders || 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 font-medium">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary.stats.avgOrderValue?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Summary Narrative with formatting */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="prose max-w-none">
                {formatNarrative(summary.narrative)}
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              This summary has also been sent to {email}
            </p>
          </div>
        )}

        {/* Sample Data Section */}
        <div className="mt-16 bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
          <h3 className="font-bold text-xl mb-6 text-blue-900">📊 Sample Data Format</h3>
          <div className="overflow-x-auto rounded-xl bg-white shadow-inner">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-100 text-blue-900">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Product_Category</th>
                  <th className="px-6 py-4 text-left font-semibold">Region</th>
                  <th className="px-6 py-4 text-left font-semibold">Units_Sold</th>
                  <th className="px-6 py-4 text-left font-semibold">Unit_Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Revenue</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2026-01-05</td>
                  <td className="px-6 py-4">Electronics</td>
                  <td className="px-6 py-4">North</td>
                  <td className="px-6 py-4">150</td>
                  <td className="px-6 py-4">1200</td>
                  <td className="px-6 py-4">180000</td>
                  <td className="px-6 py-4">Shipped</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2026-01-12</td>
                  <td className="px-6 py-4">Home Appliances</td>
                  <td className="px-6 py-4">South</td>
                  <td className="px-6 py-4">45</td>
                  <td className="px-6 py-4">450</td>
                  <td className="px-6 py-4">20250</td>
                  <td className="px-6 py-4">Shipped</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Feature Boxes Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
          <p className="text-xl text-gray-600">Powerful features designed for sales teams</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              AI-powered insights that identify trends, patterns, and key opportunities.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Delivery</h3>
            <p className="text-gray-600 leading-relaxed">
              Get professional summaries sent directly to your inbox within seconds.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Executive Ready</h3>
            <p className="text-gray-600 leading-relaxed">
              Well-formatted summaries ready to present to leadership teams.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 Rabbit AI. All rights reserved. | AI Cloud DevOps Engineer Challenge
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
