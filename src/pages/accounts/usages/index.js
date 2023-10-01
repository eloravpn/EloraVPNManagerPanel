import Modal from 'components/modal_v2';
import Usages from './Usages';
import Button from 'components/button';

const UsageAccount = ({ refrence, ...props }) => {
  return (
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="lg"
      icon="signal_cellular_alt"
      title={`Usage`}
      dialogActions={
        <>
          <Button
            type={'button'}
            variant="outlined"
            color="secondary"
            onClick={() => refrence.current.close()}
          >
            Close
          </Button>
        </>
      }
    >
      <Usages refrence={refrence} {...props} />
    </Modal>
  );
};

export default UsageAccount;
