/* eslint-disable no-undef */
const config = {
  title: process.env.REACT_APP_BASE_NAME,
  urlApi: process.env.REACT_APP_BASE_URL,
  appPrefix: process.env.REACT_APP_BASE_PREFIX,
  description: process.env.REACT_APP_BASE_DESCRIPTION,
  defaultExpireAt: process.env.REACT_APP_DEFAULT_EXPIRE_AT,
  pathToLogin: process.env.REACT_APP_PATH_TO_LOGIN,
  hideProgressBar: 5000,
  appVersion: '1.0.0'
};

export default config;
