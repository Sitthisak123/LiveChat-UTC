const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verify_TOKEN = require('../../middleware/Auth.js');


// Set up multer to store uploaded images in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { user_id } = req.user;
    const dest = `assets/user/image/${user_id}`;
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    req.file_ext = ext;
    cb(null, `profile${ext}`);
  },
});
const upload = multer({ storage });

// Endpoint to handle image uploads
router.post('/upload/ProfileImage', verify_TOKEN, upload.single('image'), (req, res) => {
  console.log('>..\t/upload/ProfileImage');
  const { user_id } = req.user;
  const ext = req.file_ext;
  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/profile${ext}`);
  console.log(filePath);

  // Check if the file exists
  fs.access(filePath, (err) => {
    if (err) {
      console.log('>..\tnot file');
      // File does not exist, send response with uploaded filename
      res.json({ filename });
      return;
    }
    console.log('>..\thas file');
    res.sendFile(filePath);
  });
});


// Endpoint to serve uploaded images
router.get('/getImage/:filename', verify_TOKEN, (req, res) => {
  const { user_id } = req.user;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
  res.sendFile(filePath);
});

module.exports = router;