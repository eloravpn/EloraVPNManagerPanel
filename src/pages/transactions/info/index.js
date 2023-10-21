import Info from './Info';
import Modal from 'components/modal_v2';
import Button from 'components/button';
import { Typography } from '@mui/material';
import UserInfo from 'pages/components/user_info';
import { isPositive, separateNum } from 'utils';

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
      <UserInfo user={initial.user}>
        <Typography variant="h6" component={'span'}>
          Amount:
        </Typography>
        <Typography
          variant="h6"
          component={'span'}
          color={isPositive(initial.amount) ? 'success' : 'error'}
        >
          {separateNum(initial.amount)}
        </Typography>
        <>{<div dangerouslySetInnerHTML={{ __html: initial.description }} />}</>
      </UserInfo>
    </Modal>
  );
};

export default InfoTransaction;
