import Routes from './routes';
import { Provider } from 'react-redux';
import { memo } from 'react';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default memo(App);
