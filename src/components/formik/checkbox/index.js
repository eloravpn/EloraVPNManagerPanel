import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import CheckboxMD from '@mui/material/Checkbox';
import { useField, useFormikContext } from 'formik';

const CheckBox = ({ name, label, legend, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    setFieldValue(name, evt.target.checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    checked: !!+field?.value
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
          <FormControlLabel control={<CheckboxMD {...configCheckbox} />} label={label} />
        </FormGroup>
      </FormControl>
    </>
  );
};

export default CheckBox;
