import { MaterialIcon } from './styled';
const Icon = ({ children, size, color = '', onClick }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <MaterialIcon
      onClick={handleClick}
      className="material-icons text-center "
      color={color}
      size={size}
    >
      {children || 'help_outline'}
    </MaterialIcon>
  );
};

Icon.defaultProps = {
  color: 'primary'
};

export default Icon;
