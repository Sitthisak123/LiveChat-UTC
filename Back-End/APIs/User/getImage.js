const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verify_TOKEN = require('../../middleware/Auth.js');
const { PrismaClient } = require('@prisma/client');
const { Console } = require('console');
const prisma = new PrismaClient()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `assets/user/image/${req.user.user_id}`); // specify the upload directory
  },
  filename: function (req, file, cb) {
    const randomName = Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    cb(null, randomName + '.' + file.originalname.split('.').pop()); // use the original file name
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed');
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.post('/upload/ProfileImage', verify_TOKEN, upload.single('image'), async (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).send({ error: req.fileValidationError });
  }

  const { user_id } = req.user;
  const { filename } = req.file;
  const { choice } = req.body;
  var update = null;
  var oldImg = null;
  try {
    if (choice === 'Upload-Profile') {
      const tempOldimg = await prisma.user.findFirst({
        where: { user_id: user_id },
        select: {
          user_id: false,
          google_id: false,
          user_username: false,
          user_password: false,
          user_email: false,
          user_phone: false,
          user_name: false,
          user_profile_img: true,
          user_cover_img: false
        }
      });
      oldImg = tempOldimg.user_profile_img;

      update = await prisma.user.update({
        where: { user_id: user_id },
        data: { user_profile_img: filename }
      });

    } else if (choice === 'Upload-Cover') {
      const tempOldimg = await prisma.user.findFirst({
        where: { user_id: user_id },
        select: {
          user_id: false,
          google_id: false,
          user_username: false,
          user_password: false,
          user_email: false,
          user_phone: false,
          user_name: false,
          user_profile_img: false,
          user_cover_img: true
        }
      });
      oldImg = tempOldimg.user_cover_img;

      update = await prisma.user.update({
        where: { user_id: user_id },
        data: { user_cover_img: filename }
      });

    } else {
      const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
      DeleteFile(filePath);
      const data = { text: "Upload Fail!", route: 'Auth' };
      return res.status(400).send(data);
    }
  } catch (err) {
  }
  const oldFilePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, oldImg);
  DeleteFile(oldFilePath);

  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
  res.sendFile(filePath);
});



// Endpoint to serve uploaded images
router.get('/getImage/:filename', verify_TOKEN, (req, res) => {
  const { user_id } = req.user;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `../../assets/user/image/${user_id}/`, filename);
  res.sendFile(filePath);
});

function DeleteFile(filePath) {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file ${filePath}: ${err}`);
      } else {
        console.log(`File ${filePath} has been deleted`);
      }
    });
  }
}


router.post('/get-OtherUserImage', (req, res) => {
  const { users } = req.body;
  const filepaths = users.map(user => path.join(__dirname, `../../assets/user/image/${user.user_id}/`, user.img));
  console.table(filepaths)
  
  res.send(filepaths);
});




module.exports = router;