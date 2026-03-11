const fileProcessor = require('../services/fileProcessor');
const aiService = require('../services/aiService');
const emailService = require('../services/emailService');

class UploadController {
  async processUpload(req, res, next) {
    try {
      const { email } = req.body;
      const file = req.file;

      console.log('📁 File received:', file?.originalname);
      console.log('📧 Email:', email);

      if (!file) {
        return res.status(400).json({
          success: false,
          error: { message: 'No file uploaded' }
        });
      }

      // Process the file
      const data = await fileProcessor.processFile(file);
      console.log(`✅ Processed ${data.length} records`);
      
      // Generate statistics
      const stats = fileProcessor.generateStats(data);
      console.log('📊 Stats generated:', stats.totalRevenue);
      
      // Generate AI narrative
      console.log('🤖 Generating AI summary...');
      const narrative = await aiService.generateNarrative(data, stats);
      console.log('✅ AI summary generated');
      
      // Send email
      console.log('📧 Sending email...');
      await emailService.sendSummary(email, narrative, file.originalname);
      console.log('✅ Email sent');

      res.status(200).json({
        success: true,
        message: 'Summary generated and sent successfully',
        data: {
          summary: {
            totalRevenue: stats.totalRevenue,
            totalUnits: stats.totalUnits,
            totalOrders: stats.totalOrders
          },
          narrative
        }
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      
      // Send appropriate error response
      res.status(500).json({
        success: false,
        error: { 
          message: error.message || 'Failed to process upload'
        }
      });
    }
  }
}

module.exports = new UploadController();