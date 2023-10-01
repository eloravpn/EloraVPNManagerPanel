import { useCallback, useState } from 'react';
import { getAllInbounds } from 'services/inboundServices';

const useInbounds = () => {
  const [inbounds, setInbounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInbounds = useCallback(async () => {
    setIsLoading(true);
    try {
      const inbounds = await getAllInbounds();
      setInbounds(inbounds);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  return { getInbounds, inbounds, isLoading };
};

export default useInbounds;
