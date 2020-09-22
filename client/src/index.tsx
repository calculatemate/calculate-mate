import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { history } from './navigation/routes';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
