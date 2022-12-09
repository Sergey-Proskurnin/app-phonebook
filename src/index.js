import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'modern-normalize/modern-normalize.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import '@fontsource/roboto';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import './i18n';

import './index.css';
import App from './App';
import { store, persistor } from 'redux/store';
import OnLoader from 'components/OnLoader';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<OnLoader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
