/* eslint-disable no-undef */
export const getConfig = () => {
  return window.appConfig;
};

const config = {
  get BASE_NAME() {
    return getConfig().BASE_NAME;
  },
  get description() {
    return getConfig().BASE_DESCRIPTION;
  },
  get appPrefix() {
    return getConfig().BASE_PREFIX;
  },
  get urlApi() {
    return getConfig().BASE_URL;
  },
  get defaultExpireAt() {
    return +getConfig().EXPIRE_AT;
  },
  get pathToLogin() {
    return getConfig().PATH_TO_LOGIN;
  },
  get hideProgressBar() {
    return getConfig().hideProgressBar;
  },
  get NAME_MANIFEST() {
    return getConfig().NAME_MANIFEST;
  }
};

export default config;
