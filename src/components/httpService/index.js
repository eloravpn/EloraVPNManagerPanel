import axios from 'axios';
import config from '../../config';

const HttpService = () => {
  var user = localStorage.getItem(`${config.appPrefix}_appData`);
  user = JSON.parse(user);
  return axios.create({
    baseURL: config?.urlApi,
    headers: {
      'X-Platform': 'APP',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${user?.value?.token}`
    }
  });
};

export default HttpService;
