import { useCallback, useState } from 'react';
import { getAllServices, getService as getServiceHook } from 'services/servicesService';

const useServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGetService, setIsLoadingGetService] = useState(false);
  const [service, setService] = useState({});
  const getServices = useCallback(async () => {
    setIsLoading(true);
    const services = await getAllServices({ sort: '-name' });
    setServices(services);
    setIsLoading(false);
  }, []);

  const getService = useCallback(async (serviceID) => {
    setIsLoadingGetService(true);
    const service = await getServiceHook(serviceID);
    setService({ ...service, host_zone_ids: service?.host_zones?.map((i) => i.id) });
    setIsLoadingGetService(false);
  }, []);

  return { isLoading, getServices, services, getService, service, isLoadingGetService };
};

export default useServices;
