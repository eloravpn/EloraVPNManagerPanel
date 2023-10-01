import Box from '@mui/material/Box';
import { GridOverlay } from '@mui/x-data-grid';
import Icon from '../icon';
import { styled } from '@mui/material/styles';

function CustomNoRowsOverlay() {
  const StyledGridOverlay = styled(GridOverlay)(({ theme }) => ({
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343'
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'
    }
  }));
  return (
    <StyledGridOverlay>
      <Icon color={'primary'}>campaign</Icon>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}
export default CustomNoRowsOverlay;
