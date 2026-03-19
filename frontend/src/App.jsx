import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import UploadForm from './components/UploadForm'
import SummaryDisplay from './components/SummaryDisplay'
import SampleDataSection from './components/SampleDataSection'
import FeatureBoxes from './components/FeatureBoxes'
import Footer from './components/Footer'

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
      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/upload`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
        withCredentials: false
      })

      if (response.data.success) {
        setSummary({
          narrative: response.data.narrative || response.data.data?.narrative,
          stats: response.data.data?.summary || response.data.summary,
          fileName: file.name
        })
        
        setStatus({ 
          type: 'success', 
          message: '✅ Summary generated successfully! Check your inbox and see below.' 
        })
        toast.success('Summary generated successfully!')
        setFile(null)
        setEmail('')
      }
    } catch (error) {
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
      
      setStatus({ type: 'error', message: `❌ ${errorMessage}` })
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

  const downloadSampleData = () => {
    const sampleData = `Date,Product_Category,Region,Units_Sold,Unit_Price,Revenue,Status
2026-01-05,Electronics,North,150,1200,180000,Shipped
2026-01-12,Home Appliances,South,45,450,20250,Shipped
2026-01-20,Electronics,East,80,1100,88000,Delivered
2026-01-25,Clothing,West,200,45,9000,Shipped
2026-01-28,Books,North,120,25,3000,Delivered
2026-02-02,Electronics,South,95,1150,109250,Shipped
2026-02-08,Home Appliances,East,32,480,15360,Cancelled
2026-02-15,Electronics,North,210,1250,262500,Delivered
2026-02-18,Clothing,South,350,40,14000,Shipped
2026-02-22,Books,West,200,28,5600,Shipped
2026-02-28,Home Appliances,North,60,400,24000,Cancelled
2026-03-03,Electronics,West,175,1180,206500,Shipped
2026-03-07,Electronics,East,140,1220,170800,Delivered
2026-03-10,Electronics,West,95,1150,109250,Shipped
2026-03-15,Clothing,North,280,38,10640,Shipped
2026-03-18,Home Appliances,South,55,420,23100,Delivered
2026-03-22,Books,East,150,22,3300,Shipped
2026-03-25,Electronics,South,110,1080,118800,Shipped
2026-03-28,Clothing,East,190,42,7980,Delivered
2026-03-31,Home Appliances,West,48,460,22080,Shipped`

    const blob = new Blob([sampleData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-sales-data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Sample data downloaded!')
  }

  const formatNarrative = (text) => {
    if (!text) return null
    
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {line.replace(/\*\*/g, '')}
        </h3>
      } else if (line.startsWith('•') || line.startsWith('-') || line.match(/^\d+\./)) {
        return <li key={index} className="text-gray-700 ml-6 mb-2">{line}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff', padding: '16px', borderRadius: '8px' },
          success: { style: { background: '#10b981' } },
          error: { style: { background: '#ef4444' } },
        }}
      />

      <Navigation apiUrl={API_URL} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        
        <UploadForm
          file={file}
          setFile={setFile}
          email={email}
          setEmail={setEmail}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        
        {status.message && (
          <div className={`mt-4 p-4 rounded-xl ${
            status.type === 'success' ? 'bg-green-50 text-green-800' : 
            status.type === 'error' ? 'bg-red-50 text-red-800' : 
            'bg-blue-50 text-blue-800'
          }`}>
            {status.message}
          </div>
        )}

        <SummaryDisplay
          summary={summary}
          email={email}
          copied={copied}
          onCopy={copyToClipboard}
          onDownload={downloadSummary}
          formatNarrative={formatNarrative}
        />

        <SampleDataSection onDownloadSample={downloadSampleData} />
      </main>

      <FeatureBoxes />
      <Footer />
    </div>
  )
}

export default Home