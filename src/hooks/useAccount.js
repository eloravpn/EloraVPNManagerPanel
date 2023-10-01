import { useCallback, useState } from 'react';
import { getUsages } from 'services/accountsSerives';

const useAccount = () => {
  const [useages, setUsages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsageAccount = useCallback(async (userId) => {
    setIsLoading(true);
    Promise.all([
      getUsages(userId, { delta: 1 }),
      getUsages(userId, { delta: 3 }),
      getUsages(userId, { delta: 7 })
    ]).then((results) => {
      setUsages([
        { name: '1 Day', ...results[0] },
        { name: '3 Day', ...results[1] },
        { name: '1 week', ...results[2] }
      ]);
    });
  }, []);

  return { isLoading, getUsageAccount, useages };
};

export default useAccount;
