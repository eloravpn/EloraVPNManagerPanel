import Modal from 'components/modal';
import View from './View';
import Button from 'components/button';

const Information = ({ refrence, pageName, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="sm"
      icon="notifications"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} ${pageName}`}
      dialogActions={
        <Button variant={'outlined'} color="error" onClick={() => refrence.current.close()}>
          Cancell
        </Button>
      }
    >
      <View refrence={refrence} {...props} />
    </Modal>
  );
};

export default Information;
