import MuiChip from '@mui/material/Chip';

const Chip = ({ label, onClick, variant, color }) => {
  return (
    <MuiChip
      sx={{ mx: 0.5, my: 0.75 }}
      label={label}
      onClick={() => onClick && onClick()}
      color={color}
      variant={variant}
    />
  );
};

Chip.defaultProps = {
  variant: 'outlined',
  color: 'primary'
};

export default Chip;
