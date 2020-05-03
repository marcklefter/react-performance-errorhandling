import React from 'react';

import Sentry from './sentry';

// ...

export default class ErrorHandler extends React.Component {
  state = {
    error: null
  };

  // ...

  retry = () => {
    this.setState({
      error: null
    });
  }

  capture = error => {
    this.setState({
      error
    });
  }

  trace = (error, errorInfo) => {
    console.log(error, errorInfo);

    Sentry.withScope(scope => {
      errorInfo && scope.setExtras(errorInfo);
      
      const eventId = Sentry.captureException(error);
      error.eventId = eventId;
    });
  }

  // ...

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.trace(error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.error === this.state.error) {
      this.retry();
    }
  }

  render() {
    const {
      error
    } = this.state;

    const {
      context:
      ErrorContext,

      fallback:
      Fallback
    } = this.props;

    if (error) {
      return <Fallback error={error} retry={this.retry} />
    }

    if (ErrorContext) {
      return (
        <ErrorContext.Provider value={{
          capture: this.capture,
          trace: this.trace
        }}>
          {this.props.children}
        </ErrorContext.Provider>
      )
    }

    return this.props.children;
  }
}