// ...
// Uncomment the following statements to enable Sentry.
//
// import * as Sentry from '@sentry/browser';

// Sentry.init({dsn: "<your Sentry URL here>"});
 
// export default Sentry;

// ...
// Comment out this proxy declaration when enabling Sentry above.
export default new Proxy(
  {}, 
  {
    get: function() {
      return function() {}
    }
  }
);