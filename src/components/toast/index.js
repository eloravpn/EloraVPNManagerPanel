import { toast } from 'react-toastify';

const Notification = {
  success(message) {
    toast.success(message, {});
  },
  danger(message) {
    toast.error(message, {});
  },
  warning(message) {
    toast.warn(message, {});
  },
  info(message) {
    toast.info(message, {});
  }
};

export default Notification;
