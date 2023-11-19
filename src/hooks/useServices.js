import { useCallback, useState } from 'react';
import { getUsages } from 'services/accountsSerives';
import { getAllServices } from 'services/servicesService';

const useServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getServices = useCallback(async (userId) => {
    setIsLoading(true);
    const services = await getAllServices({ sort: '-name' });
    setServices(services);
    setIsLoading(false);
  }, []);

  return { isLoading, getServices, services };
};

export default useServices;
