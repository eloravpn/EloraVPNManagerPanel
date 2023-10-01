import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getReportAccounts = () => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.reportsAccount)
      .then(({ data }) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
