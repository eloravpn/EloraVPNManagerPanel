import { useCallback, useState } from 'react';
import { getUsages } from 'services/accountsSerives';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const orders = await getOrders();
      setOrders(orders);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, getOrders, orders };
};

export default useOrders;
