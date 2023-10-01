import { Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

const CustomDrawer = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    onChange() {
      handleChangeStatus();
    }
  }));

  const handleChangeStatus = () => {
    setOpen(!open);
  };

  return (
    <Drawer anchor={'right'} open={open} onClose={() => setOpen(!open)}>
      <Box sx={{ width: 300 }}>
        <List>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <ListItemText primary="Filters" />
            <CloseIcon onClick={handleChangeStatus} />
          </ListItem>
        </List>
        <Divider />
        <Box mx={1} mt={3}>
          {children}
        </Box>
      </Box>
    </Drawer>
  );
});

export default CustomDrawer;
