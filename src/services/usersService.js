import HttpService from 'components/httpService';
import api from 'components/httpService/api';

export const getAllUsers = (params) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(api.users, { params })
      .then(({ data }) => {
        res(data.users);
      })
      .catch((err) => rej(err));
  });
};
export const getFullUser = (userID) => {
  return new Promise((res, rej) => {
    HttpService()
      .get(`${api.users}/${userID}`)
      .then(({ data }) => {
        res(data);
      })
      .catch((err) => rej(err));
  });
};
