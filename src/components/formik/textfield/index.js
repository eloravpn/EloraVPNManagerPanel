import MuiTextField from '@mui/material/TextField';
import { useField } from 'formik';

const TextField = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
  var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if (typeof field.value === 'string') {
    for (var i = 0; i < 10; i++) {
      field.value = field.value.replace(persianNumbers[i], i);
    }
  }

  const configInput = {
    // autoComplete: "off",
  };

  if (mata && mata.touched && mata.error) {
    configInput.error = true;
    configInput.helperText = mata.error;
  }
  return (
    <MuiTextField
      autoComplete="new-password"
      variant="outlined"
      {...field}
      {...otherProps}
      {...configInput}
    />
  );
};

TextField.defaultProps = {
  fullWidth: true
};

export default TextField;
