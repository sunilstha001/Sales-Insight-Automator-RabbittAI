import { Download, Sparkles } from 'lucide-react'

const SampleDataSection = ({ onDownloadSample }) => {
  const sampleRows = [
    { date: '2026-01-05', category: 'Electronics', region: 'North', units: 150, price: 1200, revenue: 180000, status: 'Shipped', statusColor: 'green' },
    { date: '2026-01-12', category: 'Home Appliances', region: 'South', units: 45, price: 450, revenue: 20250, status: 'Shipped', statusColor: 'green' },
    { date: '2026-01-20', category: 'Electronics', region: 'East', units: 80, price: 1100, revenue: 88000, status: 'Delivered', statusColor: 'blue' },
    { date: '2026-01-25', category: 'Clothing', region: 'West', units: 200, price: 45, revenue: 9000, status: 'Shipped', statusColor: 'green' },
    { date: '2026-01-28', category: 'Books', region: 'North', units: 120, price: 25, revenue: 3000, status: 'Delivered', statusColor: 'blue' },
    { date: '2026-02-15', category: 'Electronics', region: 'North', units: 210, price: 1250, revenue: 262500, status: 'Delivered', statusColor: 'blue' },
    { date: '2026-02-28', category: 'Home Appliances', region: 'North', units: 60, price: 400, revenue: 24000, status: 'Cancelled', statusColor: 'red' },
    { date: '2026-03-10', category: 'Electronics', region: 'West', units: 95, price: 1150, revenue: 109250, status: 'Shipped', statusColor: 'green' },
  ]

  const StatusBadge = ({ status, color }) => {
    const colors = {
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      red: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2 py-1 ${colors[color]} rounded-full text-xs font-medium`}>
        {status}
      </span>
    )
  }

  return (
    <div className="mt-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-bold text-xl text-blue-900 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
            Sample Data Format
          </h3>
          <p className="text-sm text-blue-600 mt-1">Use this format for best results</p>
        </div>
        
        <button
          onClick={onDownloadSample}
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Download Sample CSV</span>
        </button>
      </div>
      
      <div className="overflow-x-auto rounded-xl bg-white shadow-lg border border-blue-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold rounded-tl-xl">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Product</th>
              <th className="px-6 py-4 text-left font-semibold">Region</th>
              <th className="px-6 py-4 text-right font-semibold">Units</th>
              <th className="px-6 py-4 text-right font-semibold">Price</th>
              <th className="px-6 py-4 text-right font-semibold">Revenue</th>
              <th className="px-6 py-4 text-left font-semibold rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleRows.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-600">{row.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{row.category}</td>
                <td className="px-6 py-4 text-gray-600">{row.region}</td>
                <td className="px-6 py-4 text-right text-gray-600">{row.units.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-gray-600">${row.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">${row.revenue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.status} color={row.statusColor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-blue-700">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span className="font-semibold">20</span> records
          </span>
          <span className="flex items-center text-blue-700">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-semibold">$1.39M</span> total revenue
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span>Click download to test with this data</span>
        </div>
      </div>
    </div>
  )
}

export default SampleDataSection