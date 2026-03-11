/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and processing endpoints
 */

class UploadController {
  /**
   * @swagger
   * /api/upload:
   *   post:
   *     summary: Process uploaded file and send email
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
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  async processUpload(req, res, next) {
    // Your existing code
  }
}

module.exports = new UploadController();