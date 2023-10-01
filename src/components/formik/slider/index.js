import MuiSlider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const Slider = ({ name, label, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event, newValue) => {
    setFieldValue(name, newValue);
  };

  const configSlider = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    color: 'primary'
  };

  const configForm = {};

  if (mata && mata.touched && mata.error) {
    configForm.error = true;
    configForm.helperText = mata.error;
  }
  return (
    <Box>
      <Typography id={field.name} gutterBottom>
        {label}
      </Typography>
      <MuiSlider {...configSlider} aria-labelledby={field.name} />
    </Box>
  );
};

export default Slider;
