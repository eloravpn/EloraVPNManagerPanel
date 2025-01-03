import MuiTextField from '@mui/material/TextField';
import { useField } from 'formik';
import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { helpTexts } from '../../../pages/helps/helpTexts';

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

const TextField = ({ id, name, price, helperText, helperTooltip, defaultValue, ...otherProps }) => {
  const [field, mata] = useField(name);
  var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if (typeof field.value === 'string') {
    for (var i = 0; i < 10; i++) {
      field.value = field.value.replace(persianNumbers[i], i);
    }
  }

  const helpText = helpTexts[id];

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

  helperText = helpText ? helpText.helper : helperText;
  helperTooltip = helpText ? helpText.tooltip : helperTooltip;

  if (mata && mata.touched && mata.error) {
    configInput.error = true;
    configInput.helperText = mata.error;
  }
  return (
    <MuiTextField
      autoComplete="new-password"
      variant="outlined"
      helperText={helperText ? helperText : null}
      InputProps={{
        endAdornment: helperTooltip ? (
          <Tooltip title={helperTooltip} arrow>
            <IconButton size="small">
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null
      }}
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
