import MuiChip from '@mui/material/Chip';

const Chip = ({ label, onClick, variant, color, disabled }) => {
  const config = {
    ...(onClick && { onClick })
  };
  return (
    <MuiChip
      {...config}
      sx={{ mx: 0.5, my: 0.75 }}
      label={label}
      color={color}
      variant={variant}
      disabled={disabled}
    />
  );
};

Chip.defaultProps = {
  variant: 'chip',
  color: 'primary',
  disabled: false
};

export default Chip;
