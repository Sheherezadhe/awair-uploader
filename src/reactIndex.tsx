import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import constants from './constants';
import store from './store';
import App from './app';
import { AuthorizationProvider } from './utils/authorization';
import { AxiosRequestInterceptorProvider } from './utils/axios';

axios.interceptors.request.use(AxiosRequestInterceptorProvider);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <AuthorizationProvider authorizationProps={constants.identityProvider}>
        <App />
      </AuthorizationProvider>
    </Provider>
    , document.body);
}

render();