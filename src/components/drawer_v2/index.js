import MuiDrawer from '@mui/material/Drawer';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Drawer = forwardRef(({ children, anchor }, ref) => {
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
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={() => setOpen(!open)}
      PaperProps={{
        sx: {
          maxWidth: 600,
          margin: 'auto',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }
      }}
      sx={{ zIndex: 100000 }}
    >
      {children}
    </MuiDrawer>
  );
});

Drawer.defaultProps = {
  anchor: 'right'
};
export default Drawer;
