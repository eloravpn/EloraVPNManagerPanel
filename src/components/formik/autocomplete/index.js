import { CircularProgress, Stack, TextField } from '@mui/material';
import AutocompleteMD from '@mui/material/Autocomplete';
import { useField, useFormikContext } from 'formik';

export default function Autocomplete({
  name,
  options,
  label,
  renderOption,
  onInputChange,
  isLoading,
  lableName,
  ...props
}) {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];

  if (typeof field.value === 'string') {
    for (var i = 0; i < 10; i++) {
      field.value = field.value.replace(persianNumbers[i], i);
    }
  }

  const configInput = {
    options,
    getOptionLabel: (option) => option[lableName],
    onChange: (e, newValue) => {
      setFieldValue(name, newValue?.id);
    },
    onInputChange: (e, v) => onInputChange && onInputChange(e, v),
    value: options.find((i) => i.id === field.value) || null,
    onBlur: props.onBlur && props.onBlur(options.find((i) => i.id === field.value)),
    ...props
  };

  if (mata && mata.touched && mata.error) {
    configInput.error = true;
    configInput.helperText = mata.error;
  }

  return (
    <Stack spacing={2}>
      <AutocompleteMD
        {...field}
        {...configInput}
        id={name}
        filterOptions={(x) => x}
        noOptionsText={`${isLoading ? 'Loading...' : 'Oops!No Options. Please search....'}`}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            label={label}
            {...params}
            {...configInput}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    </Stack>
  );
}

Autocomplete.defaultProps = {
  options: [],
  label: 'Users',
  lableName: ''
};
