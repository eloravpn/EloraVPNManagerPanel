import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllOrder = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.orders}`, { params })
      .then(({ data }) => {
        res(data.orders);
      })
      .catch((err) => rej(err));
  });
};
