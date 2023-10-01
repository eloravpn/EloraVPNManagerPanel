import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SubMenu from './SubMenu';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/icon';

const Item = ({ title, icon, submenu, color, page }) => {
  const location = useLocation();

  const [listMenu, setListMenu] = useState(false);

  const handleClick = () => {
    setListMenu(!listMenu);
  };

  return (
    <>
      {page ? (
        <Link to={page}>
          <ListItemButton selected={location.pathname === `/${page}`}>
            <ListItemIcon>
              <Icon size="30px">{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </Link>
      ) : (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Icon size="30px">{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={title} />
            {listMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listMenu}>
            <List component="div" disablePadding className="">
              {!!submenu &&
                submenu.map(({ page, icon, title, submenu }, idx) => (
                  <SubMenu
                    title={title}
                    icon={icon}
                    color={color}
                    key={idx}
                    page={page}
                    submenu={submenu}
                    onMenu={setListMenu}
                  />
                ))}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};

export default Item;
