import { useCallback, useState } from 'react';
import { getAllPayments } from 'services/paymentsServices';

const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const payments = await getAllPayments();
      setPayments(payments);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, getPayments, payments };
};

export default usePayments;
