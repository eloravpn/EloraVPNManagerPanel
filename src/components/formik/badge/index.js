import { Box, FormHelperText, FormLabel, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectBadge = ({
  value,
  name,
  className,
  options,
  label,
  disabled,
  itemCheckShow,
  borderRadius,
  ...otherProps
}) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configSelect = {
    ...field,
    py: 1.7,
    ...otherProps,
    value: mata.value || '',
    id: name,
    error: null
  };

  if (mata && mata.touched && mata.error) {
    configSelect.error = true;
    configSelect.helperText = mata.error;
    configSelect.text = mata.error;
  }

  const handleSingleBadge = (item) => {
    if (!disabled) setFieldValue(name, item.id);
  };

  return (
    <>
      <Box>
        {label && (
          <FormLabel variant="outlined" htmlFor={name}>
            {label}
          </FormLabel>
        )}
        <Box id={name} display="flex" justifyContent="space-between" alignItems="stretch">
          {options?.map((item, i) => (
            <Box
              {...configSelect}
              borderRadius={borderRadius}
              mx={0.7}
              position={'relative'}
              key={i}
              alignItems={'center'}
              onClick={() => handleSingleBadge(item)}
              className={`badge--secondary  ${className} ${
                mata.value === item?.id
                  ? disabled
                    ? 'badge--secondary-active-disabled'
                    : 'badge--secondary-active'
                  : ''
              } ${disabled && 'disabled'}`}
            >
              <Typography variant="subtitle2" color="inherit" component={'span'}>
                {item?.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <FormHelperText {...configSelect}>{configSelect?.text}</FormHelperText>
    </>
  );
};

export default SelectBadge;
