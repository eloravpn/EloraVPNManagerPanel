import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

const Custom = styled(LoadingButton)({
  // boxShadow: "rgba(118, 53, 220, 0.24) 0px 8px 16px 0px",
  transition:
    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  padding: '7px 10px',
  borderRadius: '8px',
  margin: 1.5
});

const Button = ({
  children,
  isLoading,
  onClick,
  color,
  type = 'button',
  variant = 'contained',
  sx,
  icon,
  fullWidth = false
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    onClick && onClick();
  };
  return (
    <Custom
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      color={color}
      loading={isLoading}
      onClick={onClick && handleClick}
      sx={sx}
      endIcon={icon}
      loadingPosition="center"
    >
      {children}
    </Custom>
  );
};

export default Button;
