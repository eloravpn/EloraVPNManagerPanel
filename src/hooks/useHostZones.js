import { useCallback, useState } from 'react';
import { getAllHostZones } from '../services/hostZoneService';

const useHostZones = () => {
  const [hostZones, setHostZones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHostZones = useCallback(async () => {
    setIsLoading(true);
    try {
      const hostZones = await getAllHostZones();
      setHostZones(hostZones);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  return { getHostZones, hostZones, isLoading };
};

export default useHostZones;
