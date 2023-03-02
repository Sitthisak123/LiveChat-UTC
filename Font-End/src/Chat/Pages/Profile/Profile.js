import './Profile.css';
import React, { useState, useEffect, useRef } from 'react';
import { API_getImage, API_UploadProfileImage } from '../../../_APIs/user';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery } from '@react-hook/media-query';

import {
  StyledProfileMedia,
  StyledProfileImage,
  StyledEditIcon,
  StyledBGImage,
  StyledModalBox,
  StyledCloseIcon,
  StyledTypography
} from '../../styles';

import useErrorHandling from '../../../_methods/HandleError.js';

const Profile = () => {
  const Navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState({ profile: null, cover: null });
  const { User_data } = useSelector((state) => ({ ...state }));
  const isScreen_mn = useMediaQuery('(max-width: 340px)');
  const isScreen_md = useMediaQuery('(max-width: 480px)');
  const isScreen_lg = useMediaQuery('(max-width: 780px)');
  const { handleErrors } = useErrorHandling();
  const InputFile = useRef();
  const InputName = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [open, setOpen] = useState({ upLoad: false, choice: null, changeName: false });
  const handleUploadOpen = (event) => {
    const choice = event.target.id;
    setOpen({ upLoad: true, choice: choice, changeName: false })
  };
  const updateImg = (url) => {
    if (open.choice === 'Upload-Profile') {
      alert('1')
      setImageUrl({ ...imageUrl, profile: url })
    }
    else if (open.choice === 'Upload-Cover') {
      alert('2')
      setImageUrl({ ...imageUrl, cover: url })
    }

  }
  const handleChangeNameOpen = (event) => {
    const choice = event.target.id;
    setOpen({ upLoad: false, choice: choice, changeName: true })
  };

  const handleClose = () => {
    setOpen({ upLoad: false, choice: null, changeName: false });
    setFile(null);
  }
  const [file, setFile] = useState(null);

  const handleSelect = () => {
    InputFile.current.click();
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };


  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('choice', open.choice);
    alert(open.choice)

    API_UploadProfileImage(User_data.value.user_TOKEN).post('', formData).then((response) => {
      const blob = new Blob([response.data], { type: 'image/png' });
      updateImg(URL.createObjectURL(blob));
      handleClose();
    }).catch((error) => {
      console.error('Error uploading file:', error);
      alert('catch onUpload')
      handleErrors(error);
    });
  };
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    }, {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    }, {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    }, {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    }, {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
  ]
  useEffect(() => {
    API_getImage(User_data.value.user_TOKEN).get(User_data.value.user_profile_img)
      .then((response) => {
        const blob = new Blob([response.data], { type: 'image/png' });
        setImageUrl((prevUrl) => ({ ...prevUrl, profile: URL.createObjectURL(blob) }))
      })
      .catch((error) => {
        console.log(error);
      });

    API_getImage(User_data.value.user_TOKEN).get(User_data.value.user_cover_img)
      .then((response) => {
        const blob = new Blob([response.data], { type: 'image/png' });
        setImageUrl((prevUrl) => ({ ...prevUrl, cover: URL.createObjectURL(blob) }));
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  return (
    <div className='User_profile-main'>
      <div className='profile-headers'>
        <div className='profile_BG-img-frame'>
          <StyledBGImage src={imageUrl.cover} alt='profile.png' className='profile_bg-img' />
          <StyledEditIcon id='Upload-Cover' style={{ right: 5, bottom: 5 }} onClick={handleUploadOpen} />
        </div>
        <div className='profile_img-frame'>
          <StyledProfileImage src={imageUrl.profile} alt='profile.png' className='profile_img' />
          <StyledEditIcon id='Upload-Profile' onClick={handleUploadOpen} />
        </div>
        {
          open.changeName ?
            <Input defaultValue={'Hello'} autoFocus onBlur={handleClose} ref={InputName} className='ChangeName' />
            :
            <p className='profile_name' onClick={handleChangeNameOpen}>Name Name</p>
        }

        <p className='profile_biology'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        <ul className='profile_status'>
          <li><ContactMailIcon /><p>Contact Information</p></li>
          <li><WorkIcon /><p>Work</p></li>
          <li><FmdGoodIcon /><p>Thailand, USA, Mars</p></li>
          <li><FavoriteIcon /><p>Favorite Person</p></li>
        </ul>

        <StyledProfileMedia>
          <ImageList cols={isScreen_mn ? 2 : isScreen_md ? 3 : isScreen_lg ? 4 : 2}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </StyledProfileMedia>
      </div>

      {/* MODEL SELECT IMAGE */}
      <Modal
        open={open.upLoad}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalBox>
          <StyledTypography id="modal-modal-title" variant="h6" component="h2">
            Select Your {open.choice === 'Upload-Profile' ? 'Profile' : 'Cover'}
          </StyledTypography>
          <StyledCloseIcon onClick={handleClose} />
          <form onSubmit={handleUpload} className='Upload-Form'>
            <input type="file" accept="image/*" ref={InputFile} onChange={handleFileChange} style={{ display: 'none' }} name="image" />
            {
              file ?
                open.choice === 'Upload-Profile' ?
                  <StyledProfileImage src={previewUrl} alt='profile.png' style={{ width: 260 }} />
                  :
                  <StyledProfileImage src={previewUrl} alt='Cover.png' style={{ width: 260, borderRadius: 0, }} />
                :
                <Button onClick={handleSelect}><PhotoSizeSelectActualIcon style={{ fontSize: 250 }} /></Button>
            }
            <Button disabled={file ? false : true} style={{ marginTop: '1.2rem' }} type='submit' >Upload</Button>
          </form>
        </StyledModalBox>
      </Modal>

    </div>
  );
}

export default Profile;