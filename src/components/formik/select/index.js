import { MenuItem, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Loading from 'components/loading';

const Custom = styled(TextField)({
  borderRadius: 11,
  color: 'currentcolor'
});

const Select = ({ name, isLoading, options, labelName, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };
  const configSelect = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    select: true,
    onChange: handleChange
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
        <Custom {...configSelect}>
          {options.length > 0 &&
            Object?.keys(options)?.map((item, pos) => (
              <MenuItem key={pos} value={options[item].id}>
                {options[item].name || options[item][labelName]}
              </MenuItem>
            ))}
        </Custom>
      )}
    </>
  );
};

Select.defaultProps = {
  options: []
};

export default Select;
