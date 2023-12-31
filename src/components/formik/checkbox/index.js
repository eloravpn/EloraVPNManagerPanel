import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const CheckBoxWrapper = ({ name, label, legend, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange
  };

  const configForm = {};

  if (mata && mata.touched && mata.error) {
    configForm.error = true;
    configForm.helperText = mata.error;
  }
  return (
    <>
      <FormControl>
        <FormLabel component={'legend'}>{legend}</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox {...configCheckbox} />} label={label} />
        </FormGroup>
      </FormControl>
    </>
  );
};

export default CheckBoxWrapper;
