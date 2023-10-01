import { useCallback, useState } from 'react';
import { getAllHosts } from 'services/hostService';

const useHosts = () => {
  const [hosts, setHosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const hosts = await getAllHosts();
      setHosts(hosts);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  return { getHosts, hosts, isLoading };
};

export default useHosts;
