import AddEdit from './AddEdit';
import Modal from 'components/modal';

const AddEditForm = ({ refrence, pageName, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="lg"
      icon="signal_cellular_alt"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} Service`}
    >
      <AddEdit refrence={refrence} {...props} />
    </Modal>
  );
};

export default AddEditForm;
