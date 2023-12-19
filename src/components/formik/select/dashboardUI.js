import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const SecondarySelect = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    border: 'none',
    padding: '4px 4px 4px 8px',
    fontSize: '1.3rem',
    fontWeight: 600, // Use the system font instead of the default Roboto font.
    borderRadius: ' 8px',
    backgroundColor: 'rgb(244, 246, 248)',
    '&:focus': {
      borderColor: 'none',
      boxShadow: 'none'
    }
  }
}));
export default SecondarySelect;
