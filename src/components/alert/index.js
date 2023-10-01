import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = ({ sx, severity, message }) => {
  return (
    <MuiAlert sx={sx} severity={severity}>
      {message}
    </MuiAlert>
  );
};

Alert.propTypes = {
  sx: PropTypes.object,
  severity: PropTypes.string,
  message: PropTypes.string
};

export default Alert;
