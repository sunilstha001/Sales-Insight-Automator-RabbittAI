/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoints
 */

class HealthController {
  /**
   * @swagger
   * /api/health:
   *   get:
   *     summary: Basic health check
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: OK
   */
  check(req, res) {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        server: 'running',
        api: 'available'
      }
    });
  }

  /**
   * @swagger
   * /api/health/detailed:
   *   get:
   *     summary: Detailed health check
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Detailed system information
   */
  detailed(req, res) {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV,
      version: process.version,
      platform: process.platform
    });
  }
}

module.exports = new HealthController();