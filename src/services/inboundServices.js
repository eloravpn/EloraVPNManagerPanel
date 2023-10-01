import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllInbounds = () => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.inbounds)
      .then(({ data }) => {
        res(data.inbounds);
      })
      .catch((err) => rej(err));
  });
};
