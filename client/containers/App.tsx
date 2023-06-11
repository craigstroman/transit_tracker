import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Main from './main/Main';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
