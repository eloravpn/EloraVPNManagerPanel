import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllServices = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.services, { params })
      .then(({ data }) => {
        res(data.services);
      })
      .catch((err) => rej(err));
  });
};
