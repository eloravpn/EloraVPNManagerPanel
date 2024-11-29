import AddEdit from './AddEdit';
import Modal from 'components/modal';

const AddEditForm = ({ refrence, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="lg"
      icon="signal_cellular_alt"
      title={`${props?.initial?.id ? 'Edit' : 'Create'} Inbound`}
    >
      <AddEdit refrence={refrence} {...props} />
    </Modal>
  );
};

export default AddEditForm;
