import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllPayments = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.payments}`, { params })
      .then(({ data }) => {
        res(data.payments);
      })
      .catch((err) => rej(err));
  });
};
