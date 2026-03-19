export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  },
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700',
    hero: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
    card: 'bg-gradient-to-br from-white to-blue-50',
  },
  shadows: {
    card: 'shadow-lg hover:shadow-xl transition-shadow',
    button: 'shadow-md hover:shadow-lg transform hover:scale-105 transition-all',
  },
  animations: {
    gradient: 'animate-gradient',
    pulse: 'animate-pulse-slow',
  }
}