import axios from 'axios';
import config from '../../config';

const HttpService = () => {
  var user = localStorage.getItem(`${config.appPrefix}_appData`);
  user = JSON.parse(user);
  const instancs = axios.create({
    baseURL: config?.urlApi,
    headers: {
      'X-Platform': 'APP',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${user?.value?.token}`
    }
  });
  instancs.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      if (error.code === 'ERR_NETWORK') Notification.danger('Pleas check your network');

      return Promise.reject(error);
    }
  );
  return instancs;
};

export default HttpService;
