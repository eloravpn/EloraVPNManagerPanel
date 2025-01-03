import { useCallback, useState } from 'react';
import { getAllPaymentAccounts } from '../services/paymentAccountsSerives';

const usePaymentAccounts = () => {
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPaymentAccounts = useCallback(async (params = null) => {
    setIsLoading(true);
    try {
      const orders = await getAllPaymentAccounts(params);
      setPaymentAccounts(orders);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, getPaymentAccounts, paymentAccounts };
};

export default usePaymentAccounts;
