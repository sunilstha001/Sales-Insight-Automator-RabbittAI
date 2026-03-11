import React from 'react'
import { Mail } from 'lucide-react'

function EmailInput({ email, setEmail }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Recipient Email <span className="text-red-500">*</span>
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl 
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none
                   transition-all duration-200 placeholder:text-gray-400"
          placeholder="Enter your email address"
          required
        />
      </div>
      <p className="text-xs text-gray-500 flex items-center">
        <Mail className="h-3 w-3 mr-1" />
        We'll send the AI-generated summary to this address
      </p>
    </div>
  )
}

export default EmailInput