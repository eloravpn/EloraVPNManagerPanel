import MuiChip from '@mui/material/Chip';

const Chip = ({ label, onClick, variant, color }) => {
  const config = {
    ...(onClick && { onClick })
  };
  return (
    <MuiChip {...config} sx={{ mx: 0.5, my: 0.75 }} label={label} color={color} variant={variant} />
  );
};

Chip.defaultProps = {
  variant: 'chip',
  color: 'primary'
};

export default Chip;
