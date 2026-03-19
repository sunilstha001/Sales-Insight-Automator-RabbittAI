import { Sparkles, Copy, Check, Download } from 'lucide-react'

const SummaryDisplay = ({ 
  summary, 
  email, 
  copied, 
  onCopy, 
  onDownload,
  formatNarrative 
}) => {
  if (!summary) return null

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
            AI-Generated Summary
          </h2>
          <p className="text-gray-600 mt-1">File: {summary.fileName}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          >
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5 text-gray-600" />}
            <span className="text-sm font-medium text-gray-700">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          >
            <Download className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Download</span>
          </button>
        </div>
      </div>
      
      {summary.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Revenue" 
            value={`$${summary.stats.totalRevenue?.toLocaleString() || 'N/A'}`}
            color="blue"
          />
          <StatCard 
            label="Total Units" 
            value={summary.stats.totalUnits?.toLocaleString() || 'N/A'}
            color="pink"
          />
          <StatCard 
            label="Total Orders" 
            value={summary.stats.totalOrders || 'N/A'}
            color="blue"
          />
          <StatCard 
            label="Avg Order Value" 
            value={`$${summary.stats.avgOrderValue?.toLocaleString() || 'N/A'}`}
            color="green"
          />
        </div>
      )}
      
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
        <div className="prose max-w-none">
          {formatNarrative(summary.narrative)}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        This summary has also been sent to {email}
      </p>
    </div>
  )
}

const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
  }
  
  return (
    <div className={`${colors[color]} rounded-xl p-4`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default SummaryDisplay