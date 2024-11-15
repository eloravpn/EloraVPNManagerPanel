import React, { useState, useEffect } from 'react';
import App from './App';
import config from 'config';

function ConfigProvider() {
  const [isConfigLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      const response = await fetch('/static/config.json');
      const conf = await response.json();
      window.appConfig = conf;
      if (config.urlApi) setConfigLoaded(true);
      document.title = config.BASE_NAME;
    }
    fetchConfig();
  }, []);

  if (!isConfigLoaded) {
    return <div></div>;
  }

  return <App />;
}

export default ConfigProvider;
