import './Profile.css';
import React, { useState, useEffect } from 'react';
import { API_getImage } from '../../../_APIs/user';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery } from '@react-hook/media-query';

import { StyledProfileMedia, StyledProfileImage } from '../../styles';

const Profile = () => {
  const Navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const { User_data } = useSelector((state) => ({ ...state }));
  const isScreen_mn = useMediaQuery('(max-width: 340px)');
  const isScreen_md = useMediaQuery('(max-width: 480px)');
  const isScreen_lg = useMediaQuery('(max-width: 780px)');
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
    API_getImage.get('profile.png', {
      responseType: 'arraybuffer',
      headers: { 'access-token-key': User_data.value.user_TOKEN }
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'image/png' });
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='User_profile-main'>
      <div className='profile-headers'>
        <img src={imageUrl} alt='profile.png' className='profile_bg-img' />
        <StyledProfileImage src={imageUrl} alt='profile.png' className='profile_img' />
        <p className='profile_name'>Name Name</p>
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
    </div>
  );
}

export default Profile;
