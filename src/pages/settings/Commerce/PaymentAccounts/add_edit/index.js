import AddEdit from './AddEdit';
import Modal from 'components/modal';

const AddEditForm = ({ refrence, pageName, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="sm"
      icon="manage_accounts"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} ${pageName}`}
    >
      <AddEdit refrence={refrence} {...props} />
    </Modal>
  );
};

export default AddEditForm;
