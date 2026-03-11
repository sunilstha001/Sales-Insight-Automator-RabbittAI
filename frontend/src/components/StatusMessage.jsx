import React from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

function StatusMessage({ status }) {
  const config = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-400'
    },
    loading: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-400'
    }
  }

  const { icon: Icon, bg, border, text, iconColor } = config[status.type] || config.loading

  return (
    <div className={`mt-6 ${bg} border ${border} rounded-xl p-5`}>
      <div className="flex items-start space-x-3">
        <Icon className={`h-6 w-6 ${iconColor} flex-shrink-0 mt-0.5`} />
        <p className={`${text} font-medium`}>{status.message}</p>
      </div>
    </div>
  )
}

export default StatusMessage