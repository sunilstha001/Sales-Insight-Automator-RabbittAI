import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import EmailInput from './components/EmailInput'
import StatusMessage from './components/StatusMessage'
import LoadingSpinner from './components/LoadingSpinner'
import { Sparkles, Shield, Github, TrendingUp, Zap, MailCheck } from 'lucide-react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

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

  try {
    console.log('📤 Sending to:', API_URL)
    
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 seconds
      withCredentials: false
    })

    console.log('✅ Response:', response.data)

    if (response.data.success) {
      setStatus({ 
        type: 'success', 
        message: '✅ Summary generated and sent successfully! Check your inbox.' 
      })
      toast.success('Email sent successfully!')
      setFile(null)
      setEmail('')
    }
  } catch (error) {
    console.error('❌ Upload error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    })
    
    let errorMessage = 'Something went wrong. Please try again.'
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout. The server is taking too long to respond.'
    } else if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.error?.message || `Server error: ${error.response.status}`
    } else if (error.request) {
      // Request made but no response
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

      {/* Navigation - Full width */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Rabbitt AI
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
                href="https://github.com/sunilstha001/Sales-Insight-Automator-RabbittAI"
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

      {/* Main Content - Full width with centered content */}
      <main className="w-full">
        {/* Hero Section - Full width background with centered content */}
        <div className="w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Sales Data into
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Actionable Insights
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Upload your sales file, and let our AI generate a professional executive summary 
                delivered straight to your inbox in seconds.
              </p>
            </div>
          </div>
        </div>

       

        {/* Upload Form - Full width background */}
        <div className="w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </div>

        {/* Sample Data Section - Full width background */}
        <div className="w-full bg-blue-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100">
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
          </div>
        </div>
      </main>

       {/* Features - Full width background */}
        <div className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-purple-100 rounded-xl w-fit mb-6">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Smart Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered insights that identify trends, patterns, and key opportunities in your sales data.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-pink-100 rounded-xl w-fit mb-6">
                  <Zap className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Instant Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get professional executive summaries sent directly to your inbox within seconds.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-red-100 rounded-xl w-fit mb-6">
                  <MailCheck className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="font-bold text-xl mb-3">Executive Ready</h3>
                <p className="text-gray-600 leading-relaxed">
                  Well-formatted, professional summaries ready to present to leadership teams.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Footer - Full width */}
      <footer className="w-full bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 Rabbitt AI. All rights reserved. | AI Cloud DevOps Engineer Challenge
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App