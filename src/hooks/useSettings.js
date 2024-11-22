import { useCallback, useState } from 'react';
import { getAllSettings } from 'services/settingService';

const useSettings = () => {
  const [settings, setSettings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const hosts = await getAllSettings();
      setSettings(hosts);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  return { getSettings, settings, isLoading };
};

export default useSettings;
