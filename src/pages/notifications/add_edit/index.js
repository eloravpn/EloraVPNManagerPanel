import Modal from 'components/modal';
import AddEdit from './AddEdit';

const AddEditForm = ({ refrence, pageName, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="sm"
      icon="notifications"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} ${pageName}`}
    >
      <AddEdit refrence={refrence} {...props} />
    </Modal>
  );
};

export default AddEditForm;
