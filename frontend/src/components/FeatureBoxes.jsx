const FeatureBoxes = () => {
  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      title: 'Smart Analysis',
      description: 'AI-powered insights that identify trends, patterns, and key opportunities.',
      color: 'blue'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: 'Instant Delivery',
      description: 'Get professional summaries sent directly to your inbox within seconds.',
      color: 'pink'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: 'Executive Ready',
      description: 'Well-formatted summaries ready to present to leadership teams.',
      color: 'blue'
    }
  ]

  const colors = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-100 to-blue-50'
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      gradient: 'from-pink-100 to-pink-50'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
        <p className="text-xl text-gray-600">Powerful features designed for sales teams</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 
                     hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${colors[feature.color].gradient} 
                          rounded-2xl flex items-center justify-center mb-6`}>
              <svg className={`w-8 h-8 ${colors[feature.color].text}`} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {feature.icon}
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureBoxes