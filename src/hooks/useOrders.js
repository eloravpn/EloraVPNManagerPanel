import { useCallback, useState } from 'react';
import { getAllOrder } from 'services/ordersSerives';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = useCallback(async (params = null) => {
    setIsLoading(true);
    try {
      const orders = await getAllOrder(params);
      setOrders(orders);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, getOrders, orders };
};

export default useOrders;
