import { DialogContentText, IconButton, Stack, Typography } from '@mui/material';
import Button from 'components/button';
import Modal from 'components/modal_v2';
import { Message } from '@mui/icons-material';

const Alert = ({ refrence, title, cancelBtn, onSubmit, isLoadingSubmit, onSubmitLabel }) => {
  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Modal
        dialogActions={
          <>
            {onSubmit && (
              <Button
                color="primary"
                variant={'text'}
                isLoading={isLoadingSubmit}
                onClick={(data) => handleSubmit(data)}
              >
                {onSubmitLabel ? onSubmitLabel : 'Submit'}
              </Button>
            )}

            <Button
              variant={'standard'}
              onClick={() => (cancelBtn ? cancelBtn() : refrence?.current?.close())}
            >
              Cancell
            </Button>
          </>
        }
        popup={true}
        ref={refrence}
        maxWidth={'sm'}
        title={
          <Stack direction={'row'} alignItems="center">
            <IconButton size="lg" disableRipple>
              <Message fontSize="large" color="primary" />
            </IconButton>
            <Typography variant="h5" color={'socondary'}>
              Message
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
