import React from 'react';

import App from './App';

export default () => (
  <React.Profiler id="app" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log({
      id, phase, actualDuration, baseDuration, startTime, commitTime, interactions
    });
  }}>
    <App />
  </React.Profiler>
);