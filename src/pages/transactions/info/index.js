import Info from './Info';
import Modal from 'components/modal_v2';
import Button from 'components/button';
import { Typography } from '@mui/material';

const InfoTransaction = ({ refrence, pageName, initial }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="sm"
      icon="manage_accounts"
      title={`Info ${pageName}`}
      dialogActions={
        <Button variant={'outlined'} color="error" onClick={() => refrence.current.close()}>
          Cancell
        </Button>
      }
    >
      <Typography>{<div dangerouslySetInnerHTML={{ __html: initial.description }} />}</Typography>
    </Modal>
  );
};

export default InfoTransaction;
