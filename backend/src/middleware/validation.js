const { body, validationResult } = require('express-validator');

const validateEmail = [
  body('email').isEmail().normalizeEmail(),
  body('file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExt = req.file.originalname.substring(req.file.originalname.lastIndexOf('.')).toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
      throw new Error('Only CSV and Excel files are allowed');
    }
    
    if (req.file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size too large (max 10MB)');
    }
    
    return true;
  })
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateEmail, validate };