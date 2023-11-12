import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getReportAccount = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.reportAccount}`, { params })
      .then((data) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
export const getUserAccount = (userID) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.accounts}/${userID}`)
      .then(({ data }) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
