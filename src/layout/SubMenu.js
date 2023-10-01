import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import Item from './Item';
import { useEffect } from 'react';

const SubMenu = ({ title, page, submenu, onMenu }) => {
  let navigate = useNavigate();

  let resolved = useResolvedPath(page || '');
  let match = useMatch({ path: resolved.pathname, end: true });

  useEffect(() => {
    if (match) onMenu(true);

    return () => {};
  }, [match, onMenu]);

  const handleClick = () => {
    return navigate(page, { replace: true });
  };

  return page ? (
    <ListItemButton selected={match} onClick={handleClick}>
      <ListItemIcon>
        <FiberManualRecordIcon sx={{ height: '10px', width: '10px' }} />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  ) : (
    <Item page={page} title={title} icon={'quiz'} submenu={submenu} onMenu={onMenu} />
  );
};
export default SubMenu;
