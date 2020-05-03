import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';

// ...
// Uncomment an example to run it.

import App from './todo';
// import App from './context';
// import App from './errorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);