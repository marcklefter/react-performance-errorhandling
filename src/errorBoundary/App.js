import React from 'react';

import Sentry from './sentry';

import ErrorHandler from './ErrorHandler';
import {
  Profile,
  Content
} from './ui';

import getErrorContext from './errorContext';

import styles from './App.module.css';

// ...

// error fallback component for the top-level error boundary.
function AppFallback({ error, retry }) {
  return (
    <div>
      <p>A critical application error occurred: {error.message}</p>
      <button onClick={() => Sentry.showReportDialog({ eventId: error.eventId })}>Report Feedback</button>
      <button onClick={retry}>Retry</button>
    </div>
  )
}

export default function App() {
  return (
    <div className={styles.app}>
      {/* Top-level error boundary. */}
      <ErrorHandler 
        context={getErrorContext()}
        fallback={AppFallback}
      >
        <div className={styles.section}>
          <Profile />
        </div>
        <div className={styles.section}>
          <Content />
        </div>
      </ErrorHandler>
    </div>
  )
}

