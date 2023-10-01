import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getUsages = (userID, params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.accounts}/${userID}/${api.usedTraffic}`, { params })
      .then(({ data }) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
