import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllHosts = () => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.hosts)
      .then(({ data }) => {
        res(data.hosts);
      })
      .catch((err) => rej(err));
  });
};
