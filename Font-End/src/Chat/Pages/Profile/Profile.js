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
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const { User_data } = useSelector((state) => ({ ...state }));
  const Navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState({ profile: User_data.value.temp_profile ?? null, cover: User_data.value.temp_cover ?? null });
  const dispatch = useDispatch();
  const isScreen_mn = useMediaQuery('(max-width: 340px)');
  const isScreen_md = useMediaQuery('(max-width: 480px)');
  const isScreen_lg = useMediaQuery('(max-width: 780px)');
  const { handleErrors } = useErrorHandling();
  const InputFile = useRef();
  const InputName = useRef();
  const [newName, setNewName] = useState({ name: User_data.value.user_name, onload: false });
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
  const handleChangeNameOpen = () => {
    setOpen({ upLoad: false, choice: null, changeName: true, changeNameDialog: false, changeNameSubmit: false })
  };
  const handleChangeNameDialogOpen = () => {
    if (open.changeNameSubmit) return
    else if (User_data.value.user_name !== newName.name) setOpen({ upLoad: false, choice: null, changeName: true, changeNameDialog: true, changeNameSubmit: false })
    else setOpen({ upLoad: false, choice: null, changeName: false, changeNameDialog: false, changeNameSubmit: false })
  }

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
    setNewName({ ...newName, name: event.target.value });
  }
  const handleUpdateName = () => {
    const data = { newName: newName.name };
    setOpen({ upLoad: false, choice: null, changeName: false, changeNameDialog: false, changeNameSubmit: false });
    setNewName({ ...newName, onload: true })

    API_ChangeName(User_data.value.user_TOKEN).put('', data).then((response) => {
      console.log(response.data);
      dispatch(UPDATE_USER({ user_name: newName.name }))
      setNewName({ ...newName, onload: false })
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
    setOpen({ ...open, onload: true });
    console.log(`>> choice: ${open.choice}`)
    API_UploadProfileImage(User_data.value.user_TOKEN).post('', formData).then((response) => {
      const blob = new Blob([response.data], { type: 'image/png' });
      const imgUrl = URL.createObjectURL(blob);
      updateImg(imgUrl);
      dispatch(UPDATE_USER(open.choice === 'Upload-Profile' ? { temp_profile: imgUrl } : (open.choice === 'Upload-Cover') ? { temp_cover: imgUrl } : null))
      setOpen({ ...open, onload: false });
      handleClose();
    }).catch((error) => {
      console.error('Error uploading file:', error);
      alert('catch onUpload')
      setOpen({ ...open, onload: false });
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
    if (User_data.value.user_profile_img !== 'user_default.png') {
      API_getImage(User_data.value.user_TOKEN).get(User_data.value.user_profile_img)
        .then((response) => {
          const blob = new Blob([response.data], { type: 'image' });
          setImageUrl((prevUrl) => ({ ...prevUrl, profile: URL.createObjectURL(blob) }))
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      setImageUrl((prevUrl) => ({ ...prevUrl, profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" }));
    }
    if (User_data.value.user_cover_img !== 'user_default.png') {
      API_getImage(User_data.value.user_TOKEN).get(User_data.value.user_cover_img)
        .then((response) => {
          const blob = new Blob([response.data], { type: 'image' });
          setImageUrl((prevUrl) => ({ ...prevUrl, cover: URL.createObjectURL(blob) }));
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      setImageUrl((prevUrl) => ({ ...prevUrl, cover: "https://www.proactivechannel.com/Files/BrandImages/Default.jpg" }));
    }
  }, []);


  /*  Debug Sectoin  */
  useEffect(() => {
    console.log('change> ' + open.changeNameSubmit)
  }, [open.changeNameSubmit]);
  useEffect(() => console.log(newName), [newName]);
  useEffect(() => console.log(open), [open])

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
                onChange={(event) => setNewName({ ...newName, name: event.target.value })}
                autoFocus
                onKeyDown={(event) => { if (event.key === 'Enter') { handleUpdateName() } }}
                ref={InputName}
                className='ChangeName'
              />
              <StylrdChangeNameBTN onMouseDown={handleChangeNameSubmit} onClick={() => handleUpdateName()}>ok</StylrdChangeNameBTN>
            </div>
            : !newName.onload ?
              <p className='profile_name' onClick={handleChangeNameOpen}>{User_data.value.user_name}</p>
              :
              <p className='profile_name' >
                <Fade
                  in={true}
                  style={{
                    transitionDelay: '0ms'
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </p>
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
          {open.onload ? '' : <StyledCloseIcon onClick={handleClose} />}
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
            <Button disabled={file ? (open.onload ? true : false) : true} style={{ marginTop: '1.2rem' }} type='submit' >Upload
              {open.onload ?
                <Fade
                  in={true}
                  style={{
                    transitionDelay: '0ms',
                    position: 'absolute',
                    scale: '.8'
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade> : ''}</Button>
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