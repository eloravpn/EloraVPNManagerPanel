import MuiChip from '@mui/material/Chip';
import Loading from 'components/loading';

const Chip = ({ label, onClick, variant, color, disabled, isLoading, ...props }) => {
  const config = {
    ...(onClick && { onClick }),
    ...(isLoading && { deleteIcon: <Loading size={18} /> }),
    ...props
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
  isLoading: false,
  disabled: false,
  color: 'primary'
};

export default Chip;
