import MuiTextField from '@mui/material/TextField';
import { useField } from 'formik';
import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { InputAdornment } from '@mui/material';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const TextField = ({ name, price, helperText, ...otherProps }) => {
  const [field, mata] = useField(name);
  var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if (typeof field.value === 'string') {
    for (var i = 0; i < 10; i++) {
      field.value = field.value.replace(persianNumbers[i], i);
    }
  }

  const configInput = {
    // autoComplete: "off",
    ...(price
      ? {
          type: 'tel',
          onFocus: (e) => e.target.select(),
          InputProps: {
            inputComponent: NumericFormatCustom,
            endAdornment: (
              <>
                <InputAdornment position="end">Toman</InputAdornment>
                {otherProps?.InputProps?.endAdornment}
              </>
            )
          }
        }
      : null)
  };

  if (mata && mata.touched && mata.error) {
    configInput.error = true;
    configInput.helperText = mata.error;
  }
  return (
    <MuiTextField
      autoComplete="new-password"
      variant="outlined"
      helperText={helperText}
      InputLabelProps={{ shrink: field.value }}
      {...field}
      {...otherProps}
      {...configInput}
    />
  );
};

TextField.defaultProps = {
  fullWidth: true,
  price: false
};

export default TextField;
