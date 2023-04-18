import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { LinkStyled } from '../sideBar-styled';
const SideBarOption = (props, { children }) => {
  const { Text, Icon, Items } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: '100%' }}
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary={Text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {
            Items.map((item) => {
              const { IconItem, text, to } = item;
              return (
                <LinkStyled to={to}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <IconItem sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </LinkStyled>
              )
            })
          }

        </List>
      </Collapse>
    </List>
  );
}
export default SideBarOption;