import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useField, useFormikContext } from 'formik';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function MultipleSelect({
  name = '',
  options = [],
  label = '',
  labelName,
  labelName2
}) {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setFieldValue(
      name,
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>

        <Select
          labelId={name}
          id={name}
          multiple
          value={field.value ?? []}
          onChange={handleChange}
          input={<OutlinedInput id={name} label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={options?.find((i) => +i.id === +value)?.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.length > 0 &&
            Object?.keys(options)?.map((item, pos) => (
              <MenuItem
                sx={{
                  '&& .Mui-selected': {
                    backgroundColor: 'pink'
                  }
                }}
                key={pos}
                value={options[item].id}
                disableTouchRipple
              >
                <Checkbox
                  disableRipple
                  checked={!!field.value?.find((i) => +i === +options[item].id)}
                />
                {labelName && options[item][labelName]}
                {labelName2 && labelName2(options[item])}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
