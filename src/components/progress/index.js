import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  width: 130,
  borderRadius: 5,

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5
  }
}));

const Progress = ({ value, firstLabel, secondaryLabel }) => {
  const color =
    (value < 50 && 'success') ||
    (value > 50 && value < 70 && 'danger') ||
    (value > 70 && 'error') ||
    'primary';
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 50, mr: 0.5 }}>
          <Typography variant="body2">{firstLabel}</Typography>
        </Box>
        <Box sx={{ width: 'auto', mr: 0.5, ml: 0.5 }}>
          <BorderLinearProgress variant="determinate" value={value} color={color} />
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography variant="body2">{secondaryLabel}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Progress;
