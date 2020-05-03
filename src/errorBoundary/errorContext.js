import React from 'react';

// ...
// Top-level error context.
const RootContext = React.createContext();

export default function getErrorContext(contextName) {
  if (!contextName) {
    return RootContext;
  }

  return null;
}