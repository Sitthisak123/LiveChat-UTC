import './Profile.css';
import React, { useState, useEffect, useRef } from 'react';
import { API_getImage, API_UploadProfileImage } from '../../../_APIs/user';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { useSelector, useDispatch } from 'react-redux';
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
  StyledTypography,
  StylrdChangeNameBTN
} from '../../styles';

import useErrorHandling from '../../../_methods/HandleError.js';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ChangeName } from '../../../_APIs/system';


const Profile = () => {
  const Navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState({ profile: null, cover: null });
  const { User_data } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const isScreen_mn = useMediaQuery('(max-width: 340px)');
  const isScreen_md = useMediaQuery('(max-width: 480px)');
  const isScreen_lg = useMediaQuery('(max-width: 780px)');
  const { handleErrors } = useErrorHandling();
  const InputFile = useRef();
  const InputName = useRef();
  const [newName, setNewName] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [open, setOpen] = useState({ upLoad: false, choice: null, changeName: false, changeNameDialog: false, changeNameSubmit: false });
  const handleUploadOpen = (event) => {
    const choice = event.target.id;
    setOpen({ upLoad: true, choice: choice, changeName: false, changeNameDialog: false, changeNameSubmit: false })
  };
  const updateImg = (url) => {
    if (open.choice === 'Upload-Profile') {
      setImageUrl({ ...imageUrl, profile: url })
    }
    else if (open.choice === 'Upload-Cover') {
      setImageUrl({ ...imageUrl, cover: url })
    }

  }
  const handleChangeNameOpen = (event) => {
    const choice = event.target.id;
    setOpen({ upLoad: false, choice: null, changeName: true, changeNameDialog: false, changeNameSubmit: false })
  };
  const handleChangeNameDialogOpen = () => {
    console.log('blur> ' + open.changeNameSubmit);
    if (open.changeNameSubmit) return
    setOpen({ upLoad: false, choice: null, changeName: true, changeNameDialog: true, changeNameSubmit: false })
  }
  useEffect(() => {
    console.log('change> ' + open.changeNameSubmit)
  }, [open.changeNameSubmit])
  const handleChangeNameDialogClose = (event) => {
    if (event.target.id === 'yes') {
      setOpen({ upLoad: false, choice: null, changeName: false, changeNameDialog: false, changeNameSubmit: false })
      return
    } else if (event.target.id === 'no') {
      InputName.current.focus();
      setOpen({ upLoad: false, choice: null, changeName: true, changeNameDialog: false, changeNameSubmit: false })
    }
  }
  const handleChangeNameSubmit = () => {
    console.log('sub>');
    setOpen({ ...open, changeNameSubmit: true })
  }
  const handleClose = () => {
    setOpen({ upLoad: false, choice: null, changeName: false, changeNameDialog: false, changeNameSubmit: false });
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
  const handleOnChangeNameFoCus = (event) => {
    setOpen({ ...open, changeNameSubmit: false });
    setNewName(event.target.value);
  }

  const handleUpdateName = () => {
    // const formData = new FormData();
    const data = {newName: newName};

    API_ChangeName(User_data.value.user_TOKEN).put('', data).then((response) => {
      alert(response.data);
      dispatch(UPDATE_USER({user_name: newName}))
    }).catch((error) => {
      console.error('Error uploading file:', error);
      alert('catch onUpload')
      handleErrors(error);
    });

  };
  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('choice', open.choice);
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
            <div className='input-changeName-frame'>
              <input
                defaultValue={User_data.value.user_name}
                onFocus={handleOnChangeNameFoCus}
                onBlur={handleChangeNameDialogOpen}
                onChange={(event)=>setNewName(event.target.value)}
                autoFocus
                ref={InputName}
                className='ChangeName'
              />
              <StylrdChangeNameBTN onMouseDown={handleChangeNameSubmit} onClick={() => handleUpdateName()}>ok</StylrdChangeNameBTN>
            </div>
            :
            <p className='profile_name' onClick={handleChangeNameOpen}>{User_data.value.user_name}</p>
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

      <Dialog
        open={open.changeNameDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure, The name has not been saved.'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeNameDialogClose} id='yes'> Yes </Button>
          <Button onClick={handleChangeNameDialogClose} id='no' autoFocus> No </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Profile;