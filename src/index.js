import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import store from './redux/store';


const root = createRoot(document.getElementById('root'));

root.render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
);

reportWebVitals();
