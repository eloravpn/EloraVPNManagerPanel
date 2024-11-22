import { memo, useRef, useState, useEffect } from 'react';
import Tabs from 'components/tabs';
import { Box } from '@mui/system';
import { Alert, Grid, Typography } from '@mui/material';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Button from 'components/button';
import { getAllSettings } from 'services/settingService';
import TelgramSettings from './add_edit/Telegram';
import { useCallback } from 'react';
import SSL from './add_edit/SSL';

const pageName = 'Settings';

const tabs = [
  { id: 'telegram', name: 'Teelgram Bot' },
  { id: 'ssl', name: 'SSL' }
];

const Settings = () => {
  const createRef = useRef();

  const [data] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('telegram');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch settings from the backend
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllSettings();
      const dataMapped = data.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
      setSettings(dataMapped);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const RestartButton = () => {
    const handleRestart = async () => {
      try {
        await HttpService().post(`${api.restart}`);
        console.log('Server restart initiated');
      } catch (error) {
        console.error('Restart failed:', error);
      }
    };

    return (
      <Button
        onClick={handleRestart}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Restart Server
      </Button>
    );
  };

  return (
    <>
      <Box>
        <Grid container spacing={12} rowSpacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              {pageName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Alert severity="warning">
              Every change made here needs to be saved. Please restart the panel to apply changes.
            </Alert>
          </Grid>
        </Grid>

        <RestartButton />
        <Box sx={{ width: '100%' }}>
          <Tabs name="form-tabs" value={activeTab} tabs={tabs} onChange={handleTabChange} />

          <Box sx={{ mt: 2, p: 2 }}>
            {activeTab === 'telegram' && (
              <TelgramSettings initial={settings} pageName={pageName} refrence={createRef} />
            )}
            {activeTab === 'ssl' && (
              <SSL initial={settings} pageName={pageName} refrence={createRef} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(Settings);
