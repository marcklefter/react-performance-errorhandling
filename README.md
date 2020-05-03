Code examples accompanying my seminar on React performance and error handling.

# Requirements
Ensure that [NodeJS](https://nodejs.org/) is installed on your system.

# Usage
In the project directory, run:

    npm install

to install the project's dependencies.

## Available Scripts

    npm start

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Examples
Each example is located in the `src` directory. To run an example, uncomment its corresponding import statement in `src/index.js`.

## todo (src/todo)
This example demonstrates the following:

*   Memoizing expensive, blocking calculations with `useMemo`.

    See the `useMemoMode` hook in `hooks.js`.

*   Moving blocking operations to be performed outside the component render with `useEffect`.

    See the `useAsyncMode` hook in `hooks.js`.

*   Avoiding unnecessary component rerenders with `React.memo` and memoizing functions with `useCallback`.

    See these concepts applied in `App.js` and `Todo.js` in order to optimize rendering of a todo list.

*   Interaction tracing.

    See the `createTodo` callback function in `App.js`.

    > Note: Requires the `scheduler` package (already present in `package.json`).

*   React Profiler

    See `App.js` for how to profile rendering in code using the `React.Profiler` component, suitable for gathering profiling data in production.

## context (src/context)
This example demonstrates how to avoid unnecessary rerenders that may occur in conjunction with using React Context.

In this scenario, a context contains (global) state pertaining to authentication and theming. Two components, `<Login>` and `<ThemeSelector>`, are to be rerendered as follows:

*   When a different theme is selected, the entire component tree should be rerendered, so as to display all UI elements (buttons) with the selected theme.

*   When the authentication state changes, _only_ the `<Login>` component should be rerendered, as the `<ThemeSelector` does not utilize this slice of the state.

Uncomment a version of the `App` component in `index.js`, each of which is described below. Open the console log to observe the behaviour of each version.

*   `App1.js`

    A single `AppContext` is consumed by both `<Login>` and `<ThemeSelector>`, and a state change triggers a rerender of both components. Thus, `<ThemeSelector>` is also (unnecessarily) rerendered when the authentication state changes.

*   `App2.js`

    The previous, single `AppContext` has been split into two separate context for each state slice, `AuthContext` and `ThemeContext`, and the `<Login>` and `<ThemeSelector>` components each consume the context(s) they explicitly require. 

     `<Login>` rerenders upon changes in both contexts, whereas `<ThemeSelector>` only rerenders upon the theme changing.

*   `App3.js`

    If the contexts cannot be split, memoize and create a wrapper for the component for which rerenders are to be avoided.
    
    In this case, `<ThemeSelector>` is rendered by a wrapper component called `<ThemeSelectorWrapper>`, which consumes the `AppContext` and renders the underlying, memoized `<ThemeSelector>`. Thus, even though `<ThemeSelectorWrapper>` is rerendered when the authentication state changes, `<ThemeSelector>` - the "heavy" component - rerenders only when theme actually changes, due to memoization.

## errorBoundary (src/errorBoundary)
This example demonstrates how to implement an error boundary component (`ErrorHandler.js`) and place multiple instances of it throughout the component tree.

The `<ErrorHandler>` component supports:

*   Rendering a custom fallback UI - via a `fallback` prop - that is specific to the level in the component tree at which an error is caught.   

*   Rendering an error boundary with a so-called _error context_, which allows components below an error boundary to access methods for capturing, logging and retrying errors raised outside the component render, e.g. in event handlers and the `useEffect` hook.

    > Note: In `_Profile.js`, an alternative to using an error context is shown; here, the `<Profile>` component adds a local error state variable which is set if an error occurs in an event handler. Upon the subsequent render, the component throws the error, propagating it upwards to the error boundary.

*   Sending error events to 3rd party services such as _Sentry.io_.

    > Note: Reporting errors to Sentry is disabled by default. Enable it by following the instructions in `sentry.js`.

Test the error handling functionality in the following manner:

*   In the profile section, click the _Edit Details_ button to generate an error in an event handler. 

    This error is logged via the `trace` method from the error context rendered by the top-level error boundary.

*   Go offline by turning off your network connection. Then reload the page.

    An error occurs in the `useEffect` hook in `Profile.js`, since the user profile info cannot be fetched. This error is captured via the `capture` method from the error context. 

    Go online by turning on your network connection. In the fallback UI that is shown, click _Retry_ to reload the page; this attempts to fetch and render the user profile info again.

*   In the Feed section, click _Refresh_;  this simulates refetching feed items, generating an error that gets logged via the `trace` method from the error context.

*   In `Feed.js`, comment out the last feed item's title property, then reload the page. 

    Each feed item is wrapped in its own error boundary, which shows a specialized feed item upon catching an error occurring during the `FeedItem` render.

*   In the Search section, enter the query "fail" to simulate a search error, which is caught by the error boundary declared in `Search.js`.

    Notice that as another query is entered, the error boundary automatically resets its error state (see the componentDidUpdate lifecycle method).

## Windowing (virtualized lists)
[This demo](https://react-window-example.sethcorker.com/) illustrates the use of the windowing technique to speed up list rendering, using the [react-window](https://react-window.now.sh/) library.

Read the accompanying [article](https://medium.com/front-end-field-guide/efficiently-rendering-lists-in-react-c1e5d2260af3) for details.

# Contact
Marc Klefter | marc@remotifi.com