const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const healthController = require('../controllers/healthController');
const { validateEmail, validate } = require('../middleware/validation');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                 environment:
 *                   type: string
 */
router.get('/health', healthController.check);

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload sales file and generate AI summary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV or Excel file (max 10MB)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Recipient email address
 *             required:
 *               - file
 *               - email
 *     responses:
 *       200:
 *         description: Summary generated and sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     summary:
 *                       type: object
 *                     narrative:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Server error
 */
router.post(
  '/upload',
  upload.single('file'),
  validateEmail,
  validate,
  uploadController.processUpload
);

module.exports = router;