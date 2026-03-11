// IMPORTANT: Load dotenv config FIRST, before any other imports
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = require('./src/app');  // This imports app.js which imports aiService

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});