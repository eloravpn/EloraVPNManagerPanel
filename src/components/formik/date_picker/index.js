import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
export default function Date({ name, options, label, ...otherProps }) {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  const configDate = {
    ...field,
    ...otherProps,
    onChange: handleChange
  };

  if (mata && mata.touched && mata.error) {
    configDate.error = true;
    configDate.helperText = mata.error;
  }

  return (
    <MobileDatePicker
      fullWidth={true}
      {...configDate}
      mask="____/__/__"
      value={dayjs(field.value)}
    />
  );
}
