const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();
// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage});
  

// Define the file upload route
router.post('/upload', upload.single('file'),uploadController.uploadFile);

module.exports = router;
