const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes/apiRoutes');
const swaggerDocs = require('./routes/swagger');

const app = express();

// ✅ SIMPLE CORS FIX - THIS WILL DEFINITELY WORK
app.use(cors({
  origin: '*', // Allow all origins temporarily for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Security middleware
app.use(helmet());

// Rate limiting
app.use('/api/', rateLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Swagger documentation
app.use('/api-docs', swaggerDocs.serve, swaggerDocs.setup);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(errorHandler);

module.exports = app;