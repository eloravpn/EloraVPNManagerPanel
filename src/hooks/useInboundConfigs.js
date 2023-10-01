import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import { useCallback, useState } from 'react';
import { getAllInbounds } from 'services/inboundServices';

const useInboundConfigs = () => {
  const [inboundConfigs, setInboundConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInboundConfigs = useCallback(async () => {
    setIsLoading(true);
    try {
      const inbounds = await getAllInbounds();
      setInboundConfigs(inbounds);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  const addInboundConfigs = (data) => {
    HttpService().post(api.inboundConfigs, data);
  };

  return { getInboundConfigs, inboundConfigs, isLoading, addInboundConfigs };
};

export default useInboundConfigs;
