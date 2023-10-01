import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Icon from '../icon';

const Modal = forwardRef(({ title, children, onBackClose, maxWidth, popup, icon }, ref) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useImperativeHandle(ref, () => ({
    changeStatus() {
      handleChangeStatus();
    }
  }));

  const handleChangeStatus = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onClose={() => (onBackClose ? handleChangeStatus() : false)}
      maxWidth={maxWidth || 'md'}
      fullScreen={popup ? false : fullScreen}
      fullWidth
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Grid container alignItems={'center'}>
            {!!icon && (
              <Icon size="35px" color="primary">
                {icon}
              </Icon>
            )}
            <Typography variant="h6" color="inherit" component="div">
              {title}
            </Typography>
          </Grid>
          <IconButton aria-label="close" onClick={handleChangeStatus}>
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
});
Modal.defaultProps = {
  onBackClose: true
};
export default Modal;
