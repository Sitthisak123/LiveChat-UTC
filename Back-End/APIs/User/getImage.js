const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verify_TOKEN = require('../../middleware/Auth.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// // Set up multer to store uploaded images in the 'uploads' directory
// const storage = multer.diskStorage({
//   destination: function (req, choice,file, cb) {
//     const { user_id } = req.user;
//     console.log(`\nerr>> 1 ${JSON.stringify(file)}\n`);

//     const dest = `assets/user/image/${user_id}`;
//     cb(null, dest);
//   },
//   filename: function (req, file, cb) {
//     console.log(`\nerr>> 1 ${req.body.choice}\n`);
//     const filename = req.body.choice === 'Upload-Profile' ? 'profile' :
//       req.body.choice === 'Upload-Cover' ? 'cover' : null
//     if (!filename){
//       req.errs = {status: 400, msg: 'Error: filename is not defined'};
//     }
//       const ext = path.extname(file.originalname);
//       req.file_ext = ext;
//       cb(null, `profile${ext}`);    
//   },
// });

// const upload = multer({ storage });
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'assets'); // specify the upload directory
  },
  filename: function(req, file, cb) {
    const randomName = Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    cb(null, randomName + '.' + file.originalname.split('.').pop()); // use the original file name
  }
});

const upload = multer({ storage: storage });

router.post('/upload/ProfileImage', verify_TOKEN, upload.single('image'), (req, res) => {
  console.log(req.file); // the uploaded file info
  console.log(req.body.choice);
  res.send('File uploaded successfully');
});


// Endpoint to handle image uploads
// router.post('/upload/ProfileImage', verify_TOKEN, upload.single('image'), (req, res) => {
//   console.log(`\nerr>> 2 ${req.body.choice}\n`);


//   console.log('>..\t/upload/profileimage');

//   const { user_id } = req.user;
//   const ext = req.file_ext;
//   const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/profile${ext}`);
//   console.log(filePath);
//   // Check if the file exists
//   fs.access(filePath, (err) => {
//     if (err) {
//       console.log('>..\tnot file');
//       // File does not exist, send response with uploaded filename
//       res.json({ filename });
//       return;
//     }
//     const update = prisma.user.update({
//       where: { user_id: user_id },
//       data: { user_profile_img: `profile${ext}` }
//     })
//     console.log('>..\thas file');
//     res.sendFile(filePath);
//   });
// });


// Endpoint to serve uploaded images
router.get('/getImage/:filename', verify_TOKEN, (req, res) => {
  const { user_id } = req.user;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
  res.sendFile(filePath);
});

module.exports = router;