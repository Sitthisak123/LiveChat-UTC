import { useState } from 'react';
import { API_UploadProfileImage } from './_APIs/user';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ImageUpload = () => {
  const { User_data } = useSelector((state) => ({ ...state }));
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile)); // generate a temporary URL for preview
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    API_UploadProfileImage.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access-token-key': User_data.value.user_TOKEN
      },
    })
      .then((response) => {
        console.log('File uploaded successfully:', response.data.filename);
        // do something with the filename
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleUpload}>
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <Button onClick={handleOpen}>Open modal</Button>
      </form>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              {previewUrl && <img src={previewUrl} alt='preview' />} {/* show preview image if exists */}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ImageUpload;
