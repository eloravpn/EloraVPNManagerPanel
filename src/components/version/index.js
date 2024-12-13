import { useState, useEffect } from 'react';
import HttpService from '../httpService';
import api from '../httpService/api';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    HttpService()
      .get(api.settings)
      .then((data) => setVersionInfo(data))
      .catch((error) => console.error('Error fetching version:', error));
  }, []);

  if (!versionInfo) return null;

  return (
    <Box sx={{ opacity: 0.9 }}>
      <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500 }}>
        Version: {versionInfo.version}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Build Date:{' '}
        {new Date(versionInfo.build_date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Typography>
    </Box>
  );
};
