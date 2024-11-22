import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllSettings = () => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.settings)
      .then(({ data }) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
