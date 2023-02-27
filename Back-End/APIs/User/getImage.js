const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const verify_TOKEY = require('../../middleware/Auth.js');

// Set up multer to store uploaded images in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// Endpoint to handle image uploads
router.post('/uploadImage', upload.single('image'), (req, res) => {
  // Return the filename of the uploaded image
  res.json({ filename: req.file.filename });
});

// Endpoint to serve uploaded images
router.get('/getImage/:filename', verify_TOKEY ,(req, res) => {
  const { user_id } = req.user;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
  res.sendFile(filePath);
});

module.exports = router;