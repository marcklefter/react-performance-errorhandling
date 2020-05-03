import React, {
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

import styles from './App.module.css';

// ...

const theme1 = 'lightgray';
const theme2 = '#9A97F3';

// ...

const AppContext = React.createContext();

// ...

function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    login: false,
    theme: theme1
  });

  const setState = useCallback(partialState => {
    setAppState(prevState => ({
      ...prevState,

      ...partialState
    }));
  }, []);

  const {
    login, 
    theme
  } = appState;

  // prohibit a potential rerender when creating the 'value' object.
  const value = useMemo(() => ({
    login,
    theme,

    setLogin(login) {
      setState({ login })
    },
    setTheme(theme) {
      setState({ theme })
    }
  }), [login, theme, setState]);

  // const value = {
  //   login,
  //   theme,

  //   setLogin(login) {
  //     setState({ login })
  //   },
  //   setTheme(theme) {
  //     setState({ theme })
  //   }
  // };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// ...

function Login() {
  console.log('Render:Login');

  const {
    login,
    setLogin,

    theme
  } = useContext(AppContext);

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => setLogin(!login)} style={{ backgroundColor: theme }}>
        {login ? 'Logout' : 'Login'}
      </button>
    </>
  )
}

function ThemeSelector() {
  console.log('Render:ThemeSelector');

  const {
    theme,
    setTheme
  } = useContext(AppContext);

  return (
    <>
      <h1>Theme Selector</h1>
      <button onClick={() => setTheme(theme1)} style={{ backgroundColor: theme }}>Set Theme 1</button>
      <button onClick={() => setTheme(theme2)} style={{ backgroundColor: theme }}>Set Theme 2</button>
    </>
  )
}

// ...

export default function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <div className={styles.section}>
          <Login />
        </div>
        <div className={styles.section}>
          <ThemeSelector />
        </div>
      </div>
    </AppProvider>
  )
}