import { DialogContentText, IconButton, Stack, Typography } from '@mui/material';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import Modal from 'components/modal_v2';
import Button from 'components/button';

const Alert = ({ refrence, onDelete, title, cancelBtn, onDeleteLabel, onDeleteLoading }) => {
  const handleDelete = (data) => {
    onDelete(data);
  };

  return (
    <>
      <Modal
        ref={refrence}
        dialogActions={
          <>
            {onDelete && (
              <Button
                variant={'text'}
                color="error"
                isLoading={onDeleteLoading}
                onClick={(data) => handleDelete(data)}
              >
                {onDeleteLabel ? onDeleteLabel : 'Delete'}
              </Button>
            )}

            <Button
              variant={'text'}
              onClick={() => (cancelBtn ? cancelBtn() : refrence?.current?.close())}
            >
              Cancell
            </Button>
          </>
        }
        popup={true}
        maxWidth={'sm'}
        title={
          <Stack direction={'row'} alignItems="center">
            <IconButton size="lg" disableRipple>
              <ErrorRoundedIcon color="error" sx={{ fontSize: 30 }} />
            </IconButton>
            <Typography variant="h5" color={'socondary'}>
              Danger{' '}
            </Typography>
          </Stack>
        }
      >
        <DialogContentText>{title}</DialogContentText>
      </Modal>
    </>
  );
};

export default Alert;
