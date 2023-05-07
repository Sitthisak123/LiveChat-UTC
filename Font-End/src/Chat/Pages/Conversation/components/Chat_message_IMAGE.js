import './Chat_message.css';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useContext, useRef, useState } from 'react';
import { SocketMethod } from '../../../../Home/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircularProgress from '@mui/material/CircularProgress';

const ChatmessageIMAGE= (props) => {
  const { id, from_id, name, message, timest, image, msg_type } = props;
  const { User_data } = useSelector((state) => ({ ...state }));
  const my_id = User_data.value.user_id;
  const msg_ref = useRef();
  const FILE_info = JSON.parse(message);
  const [onHover, setOnHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState(false);
  const [onload, setOnload] = useState(false);
  const { socket_UnSendMessage } = useContext(SocketMethod);

  const handleOpenMenu = (event) => {
    setAnchorEl(msg_ref.current);
    setMenu(true);
  }
  const handleCloseMenu = (event) => {
    setAnchorEl(null);
    setMenu(false);
  }
  const handleCopyClick = () => {
    navigator.clipboard.writeText(message);
    handleCloseMenu();
  };
  const handleChangeMSGStatus = (mode) => {
    handleCloseMenu();
    setOnload(true);
    const newStatusMSG = mode === 'delete' ? 1 : mode === 'unsend' ? 2 : '';
    socket_UnSendMessage({ newStatus: newStatusMSG, msg_id: id });
  }


  const date = new Date(timest);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const outputTime = `${year}/${month}/${day} ${hour}:${minute}`;
  
  const anchorSetUp = my_id == from_id ?
  {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    }
  } : {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  }

  return (
    <div key={id} className={`Chat_message_list ${my_id === from_id ? 'right' : 'left'}`}>

      <div className='Chat_Avatar'>
        <Avatar alt={name} src={`${process.env.REACT_APP_IMG_URL}${my_id === from_id ? my_id : from_id}/${my_id == from_id ? User_data.value.user_profile_img : image}`} />
      </div>

      <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className={`Chat_informations ${my_id === from_id ? 'right' : 'left'}`}>

        <div ref={msg_ref} className='Chat_msg FILE' >
          <img alt={FILE_info.src} src={`${process.env.REACT_APP_ASSESTS_URL}${FILE_info.src}`} />
        </div>

        {
          onHover ?
            <div onClick={handleOpenMenu} className='chat_more_action'>
              <MoreHorizIcon sx={{cursor: "pointer"}} />
            </div>
            :
            <div className='chat_more_action hide'>
              {
                onload ?

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
                  </Fade>
                  :
                  <MoreHorizIcon />
              }
            </div>
        }


        <div className={`chat_info ${my_id === from_id ? 'right' : 'left'}`}>
          <div className='chat_info_time'>{outputTime}</div>
          <div className='chat_info_name'>{my_id === from_id ? 'You' : ''}</div>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={anchorSetUp.anchorOrigin}
        transformOrigin={anchorSetUp.transformOrigin}
      >
        <MenuItem onClick={handleCopyClick} disableRipple>Copy</MenuItem>
        {
          my_id === from_id ?
            <MenuItem onClick={() => handleChangeMSGStatus('unsend')} disableRipple>Unsend</MenuItem>
            :
            ''
        }
        <MenuItem onClick={() => handleChangeMSGStatus('delete')} disableRipple>Delete</MenuItem>
      </Menu>

    </div>
  )
}
export default ChatmessageIMAGE;