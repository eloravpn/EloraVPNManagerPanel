import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllPaymentAccounts = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.paymentAccounts}`, { params })
      .then(({ data }) => {
        res(data.payment_accounts);
      })
      .catch((err) => rej(err));
  });
};
