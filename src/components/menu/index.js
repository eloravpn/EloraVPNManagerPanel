import { Fade, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { forwardRef, useImperativeHandle } from 'react';
import Icon from '../icon';

const MenuCustom = forwardRef(({ items }, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  useImperativeHandle(ref, () => ({
    changeStatus(e) {
      handleClick(e);
    }
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '200px',
            boxShadow:
              'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
            borderRadius: '12px'
          }
        }}
        TransitionComponent={Fade}
      >
        {!!items &&
          items?.map(({ name, icon, color, onClick }, idx) => (
            <MenuItem
              key={idx}
              onClick={(e) => {
                onClick(e);
                handleClose();
              }}
              sx={{
                marginX: 2,
                marginY: 1,
                borderRadius: '6px',
                minHeight: 'auto'
              }}
            >
              <ListItemIcon>
                <Icon color={color} size="20px">
                  {icon}
                </Icon>
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
});

export default MenuCustom;
