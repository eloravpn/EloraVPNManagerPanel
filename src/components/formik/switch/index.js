import { FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import SwitchMd from '@mui/material/Switch';
const Switch = ({ name, label, legend, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configSwitch = {
    ...field,
    ...otherProps,
    checked: field.value,
    onChange: handleChange
  };

  const configForm = {};

  if (mata && mata.touched && mata.error) {
    configForm.error = true;
    configForm.helperText = mata.error;
  }
  return (
    <>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            {...otherProps}
            control={<SwitchMd {...configSwitch} />}
            label={label}
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export default Switch;
