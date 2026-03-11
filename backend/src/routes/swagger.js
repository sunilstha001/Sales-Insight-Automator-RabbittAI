const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales Insight Automator API',
      version: '1.0.0',
      description: 'API for processing sales data and generating AI summaries',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: [
    './src/routes/*.js',        // Look for annotations in route files
    './src/controllers/*.js',    // Look for annotations in controller files
    './src/models/*.js'           // Optional: if you have models
  ],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, { explorer: true })
};