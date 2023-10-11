import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import Loading from 'components/loading';
import SelectMD from '@mui/material/Select';

const Select = ({ name, label, isLoading, options, onChange, labelName, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
    onChange && onChange(options.find((i) => i.id === value));
  };
  const configSelect = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    onChange: handleChange,
    value: field.value || ''
  };
  if (mata && mata.touched && mata.error) {
    configSelect.error = true;
    configSelect.helperText = mata.error;
  }
  return (
    <>
      {isLoading ? (
        <Loading size={35} />
      ) : (
        <FormControl fullWidth>
          <InputLabel id={name}>{label}</InputLabel>
          <SelectMD labelId={name} label={label} {...configSelect}>
            {options.length > 0 &&
              Object?.keys(options)?.map((item, pos) => (
                <MenuItem key={pos} value={options[item].id}>
                  {options[item][labelName]}
                </MenuItem>
              ))}
          </SelectMD>
        </FormControl>
      )}
    </>
  );
};

Select.defaultProps = {
  options: [],
  labelName: 'name'
};

export default Select;
