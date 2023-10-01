import { useField, useFormikContext } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const SelectWrapper = ({ label, name, options, val, labelName, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt, newValue) => {
    const value = newValue.map((i) => i.id);
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps
  };

  if (mata && mata.touched && mata.error) {
    configSelect.error = true;
    configSelect.helperText = mata.error;
  }

  return (
    <Stack>
      <Autocomplete
        {...configSelect}
        disableCloseOnSelect={true}
        onChange={handleChange}
        multiple={true}
        id={name}
        options={options}
        getOptionLabel={(option) => option.name || option[labelName]}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} placeholder={label} />
        )}
      />
    </Stack>
  );
};

export default SelectWrapper;
