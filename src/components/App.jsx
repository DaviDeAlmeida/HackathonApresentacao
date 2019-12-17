import React from 'react';
import { Provider } from 'mobx-react';

import Routes from './Routes';
import AppStore from '../stores/AppStore';

const App = () => (
  <Provider AppStore={AppStore}>
    <Routes />
  </Provider>
);

export default App;
