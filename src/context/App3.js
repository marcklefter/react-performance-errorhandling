import React, {
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
  const [login, setLogin] = useState(false);
  const [theme, setTheme] = useState(theme1);

  const value = {
    login,
    setLogin,

    theme,
    setTheme
  };

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

function ThemeSelectorWrapper() {
  const {
    theme,
    setTheme
  } = useContext(AppContext);

  return <ThemeSelector theme={theme} setTheme={setTheme} />
}

const ThemeSelector = React.memo(({ theme, setTheme }) => {
  console.log('Render:ThemeSelector');

  return (
    <>
      <h1>Theme Selector</h1>
      <button onClick={() => setTheme(theme1)} style={{ backgroundColor: theme }}>Set Theme 1</button>
      <button onClick={() => setTheme(theme2)} style={{ backgroundColor: theme }}>Set Theme 2</button>
    </>
  )
});

// ...

export default function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <div className={styles.section}>
          <Login />
        </div>
        <div className={styles.section}>
          <ThemeSelectorWrapper />
        </div>
      </div>
    </AppProvider>
  )
}