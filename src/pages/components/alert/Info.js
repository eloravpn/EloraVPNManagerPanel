import { DialogActions, DialogContentText, IconButton, Stack, Typography } from '@mui/material';
import CustomDialog from 'components/modal';
import InfoIcon from '@mui/icons-material/Info';
import Button from 'components/button';

const Alert = ({ title, refrence }) => {
  return (
    <>
      <CustomDialog
        popup={true}
        ref={refrence}
        maxWidth={'sm'}
        title={
          <Stack direction={'row'} alignItems="center">
            <IconButton size="lg" disableRipple>
              <InfoIcon color="info" sx={{ fontSize: 30 }} />
            </IconButton>
            <Typography variant="h5" color={'socondary'}>
              هشدار
            </Typography>
          </Stack>
        }
      >
        <DialogContentText>{title}</DialogContentText>
        <DialogActions>
          <Button variant={'outlined'} onClick={() => refrence?.current?.changeStatus()}>
            متوجه شدم
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};
export default Alert;
