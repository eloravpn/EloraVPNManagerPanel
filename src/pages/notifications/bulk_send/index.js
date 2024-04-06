import Modal from 'components/modal';
import BulkSend from './BulkSend';

const BulkSendForm = ({ refrence, pageName, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="lg"
      icon="notifications"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} ${pageName}`}
    >
      <BulkSend refrence={refrence} {...props} />
    </Modal>
  );
};

export default BulkSendForm;
