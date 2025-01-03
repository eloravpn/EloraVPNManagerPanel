import { memo, useRef, useState, useEffect } from 'react';
import Tabs from 'components/tabs';
import { Box } from '@mui/system';
import { Alert, Grid, Tooltip, Typography } from '@mui/material';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Button from 'components/button';
import { getAllSettings } from 'services/settingService';
import TelgramSettings from './add_edit/Telegram';
import { useCallback } from 'react';
import SSL from './add_edit/SSL';
import Basic from './add_edit/Basic';
import Payment from './add_edit/Payment';
import Commerce from './Commerce';

const pageName = 'Settings';

const tabs = [
  { id: 'basic', name: 'Basic' },
  { id: 'payment', name: 'Payment' },
  { id: 'commerce', name: 'Commerce' },
  { id: 'telegram', name: 'Telegram Bot' },
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
  const [activeTab, setActiveTab] = useState('basic');

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
    const [countdown, setCountdown] = useState(0);
    const intervalRef = useRef(null);

    const handleRestart = async () => {
      if (countdown > 0) {
        window.alert('Please, wait to restart');
        return;
      }

      if (!window.confirm('Are you sure you want to restart the server?')) {
        return;
      }

      setCountdown(60);

      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      try {
        await HttpService().post(`${api.restart}`);
      } catch (error) {
        console.error('Restart failed:', error);
      }
    };

    useEffect(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, []);

    return (
      <Tooltip
        title={
          countdown > 0 ? 'Please wait for the restart to complete' : 'Click to restart server'
        }
        arrow
      >
        <span>
          {' '}
          {/* Wrapper needed for disabled button tooltip */}
          <Button
            onClick={handleRestart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Restarting (${countdown}s)` : 'Restart Server'}
          </Button>
        </span>
      </Tooltip>
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

        <Box sx={{ m: 1 }}>
          <RestartButton />
        </Box>

        <Box sx={{ width: '100%' }}>
          <Tabs name="form-tabs" value={activeTab} tabs={tabs} onChange={handleTabChange} />

          <Box sx={{ mt: 1, p: 2 }}>
            {activeTab === 'telegram' && (
              <TelgramSettings initial={settings} pageName={pageName} refrence={createRef} />
            )}
            {activeTab === 'ssl' && (
              <SSL initial={settings} pageName={pageName} refrence={createRef} />
            )}
            {activeTab === 'basic' && (
              <Basic initial={settings} pageName={pageName} refrence={createRef} />
            )}
            {activeTab === 'payment' && (
              <Payment initial={settings} pageName={pageName} refrence={createRef} />
            )}
            {activeTab === 'commerce' && (
              <Commerce initial={settings} pageName={pageName} refrence={createRef} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(Settings);
