import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Container,
  CssBaseline,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Drawer
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MenuConfig from './MenuConfig';
import Item from './Item.js';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CustomMenu from '../components/menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../components/avatar';
import { stringAvatar } from '../utils';
import { Menu, MoreVert } from '@mui/icons-material';

let drawerWidth = 240;
const color = '#7635dc';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const XsDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`
  }),
  background: '#fff',
  boxShadow: 'none',
  color: 'black',
  border: 'none'
}));

const Sidebar = (props) => {
  const { children, window } = props;
  const menuRef = useRef();
  const mobileMenuRef = useRef();
  const [open, setOpen] = useState(true);
  const [fix, setFix] = useState(true);
  const [openDraweMobile, setOpenDraweMobile] = useState(false);

  const handleDrawerClose = () => {
    setOpen(true);
    setFix(!fix);
  };

  const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
      margin: 5,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: 'rgb(99, 115, 129)'
    },

    '& .Mui-selected': {
      color
    },
    '& .MuiTouchRipple-root': {
      color
    },

    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
      color: 'inherit'
    },
    '& .MuiListItemText-root': {
      display: `${open ? '' : 'none'}`,
      color: 'inherit'
    }
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const [permissions] = useState();
  // !!localStorage.getItem(`${config.perfix}permissions`)
  //   ? JSON.parse(localStorage.getItem(`${config.perfix}permissions`))
  //   : null
  const [menu, setMenu] = useState([]);
  const [user] = useState({ name: 'Elora Admin', username: 'Elora' });
  // !!localStorage.getItem(`${config.perfix}user`)
  //   ? JSON.parse(localStorage.getItem(`${config.perfix}user`))
  //   : null

  const findItemNested = useCallback((arr, per) => {
    return arr
      .map((item) => {
        return { ...item };
      })
      .filter((item) => {
        if ('submenu' in item) {
          item.submenu = findItemNested(item.submenu, per);
        }
        return per?.includes(item?.permission);
      });
  }, []);

  useEffect(() => {
    setMenu(MenuConfig.aside.items);
  }, [findItemNested, permissions]);

  const drawer = (
    <>
      <DrawerHeader sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton onClick={handleDrawerClose}>{open && <ChevronRightIcon />}</IconButton>
      </DrawerHeader>
      <FireNav>
        <ListItemButton selected>
          <ListItemIcon>
            <CustomAvatar {...stringAvatar(user?.name)} />
          </ListItemIcon>
          <ListItemText primary={user?.name} secondary={user?.username} />
        </ListItemButton>
      </FireNav>
      <FireNav
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Divider />
          </ListSubheader>
        }
      >
        {menu.map(({ page, icon, title, submenu }, idx) => (
          <Item
            key={idx}
            page={page}
            title={title}
            icon={icon}
            openDrawer={open}
            submenu={submenu}
            color={color}
          />
        ))}
      </FireNav>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CustomMenu
        ref={menuRef}
        items={[
          {
            id: 1,
            name: 'Logout',
            icon: 'logout',
            color: 'red',
            onClick: handleLogout
          }
        ]}
      />
      <CustomMenu
        ref={mobileMenuRef}
        items={[
          {
            id: 1,
            name: 'Notifications',
            icon: 'notifications',
            color: 'primary',
            onClick: () => alert()
          },
          {
            id: 1,
            name: 'Profile',
            icon: 'person',
            color: 'primary',
            onClick: () => alert()
          }
        ]}
      />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
                size="large"
                onClick={() => {
                  setOpenDraweMobile(!openDraweMobile);
                }}
              >
                <Menu color="secondary" />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large">
                <PeopleAltIcon color="secondary" />
              </IconButton>
              <IconButton size="large">
                <NotificationsNoneIcon color="secondary" />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                onClick={(e) => mobileMenuRef.current.changeStatus(e)}
              >
                <MoreVert color="secondary" />
              </IconButton>
            </Box>
            <IconButton disableRipple onClick={(e) => menuRef.current.changeStatus(e)}>
              <CustomAvatar {...stringAvatar(user?.name)} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* End Appbar */}

        <XsDrawer
          onMouseOver={() => !fix && setOpen(true)}
          onMouseLeave={() => !fix && setOpen(false)}
          open={open}
          onClose={handleDrawerClose}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box'
            }
          }}
        >
          {drawer}
        </XsDrawer>

        <Drawer
          container={container}
          variant="temporary"
          open={openDraweMobile}
          onClose={() => setOpenDraweMobile(false)}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>

        <Container
          component="main"
          sx={{
            width: '100%',
            p: { lg: 5, sm: 0 }
          }}
          maxWidth="fluid"
        >
          <DrawerHeader />
          {children}
        </Container>
      </Box>
    </>
  );
};

export default memo(Sidebar);
