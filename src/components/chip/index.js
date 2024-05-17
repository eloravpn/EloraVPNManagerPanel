import MuiChip from '@mui/material/Chip';
import Loading from 'components/loading';

const Chip = ({
  label,
  onClick,
  variant = 'chip',
  color = 'primary',
  disabled = false,
  isLoading = false,
  ...props
}) => {
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

export default Chip;
