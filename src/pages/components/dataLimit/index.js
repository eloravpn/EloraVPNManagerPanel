import { Grid } from '@mui/material';
import Slider from 'components/formik/slider';
import { styled } from '@mui/material/styles';
import TextField from 'components/formik/textfield';

const Input = styled(TextField)`
  width: 75px;
`;

function valueLabelFormat(value) {
  const unit = 'GB';
  let scaledValue = value;

  return `${scaledValue} ${unit}`;
}

function calculateValue(value) {
  return value;
}

const DataLimit = ({ disabled }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Input
          disabled={disabled}
          fullWidth={false}
          size="small"
          name={'data_limit'}
          inputProps={{
            step: 1,
            min: 0,
            max: 500,
            type: 'number',
            'aria-labelledby': 'input-slider'
          }}
        />
      </Grid>
      <Grid item xs>
        <Slider
          disabled={disabled}
          name={'data_limit'}
          min={0}
          max={500}
          step={1}
          scale={calculateValue}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
};

export default DataLimit;
