import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllHostZones = () => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.hostZones)
      .then(({ data }) => {
        res(data.host_zones);
      })
      .catch((err) => rej(err));
  });
};
