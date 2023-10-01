import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const RadioWrapper = ({ name, label, labelName, options, legend, row, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...otherProps
  };

  const configForm = {};
  const configRadioGroup = {
    ...field,
    row: row,
    onChange: handleChange
  };

  if (mata && mata.touched && mata.error) {
    configForm.error = true;
    configForm.helperText = mata.error;
  }
  return (
    <FormControl {...configForm}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...configRadioGroup}>
        {Object.keys(options).map((item, pos) => (
          <FormControlLabel
            key={pos}
            value={options[item].id}
            control={<Radio {...configRadio} />}
            label={options[item].name || options[item][labelName]}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioWrapper;
