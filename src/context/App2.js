import React, {
  useContext,
  useState
} from 'react';

import styles from './App.module.css';

// ...

const theme1 = 'lightgray';
const theme2 = '#9A97F3';

// ...

const AuthContext = React.createContext();
const ThemeContext = React.createContext();

// ...

function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);

  const value = {
    login,
    setLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(theme1);

  const value = {
    theme,
    setTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ...

function Login() {
  console.log('Render:Login');

  const {
    login,
    setLogin
  } = useContext(AuthContext);

  const {
    theme
  } = useContext(ThemeContext);

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
  } = useContext(ThemeContext);

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
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.section}>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </div>
        <div className={styles.section}>
          <ThemeSelector />
        </div>
      </div>
    </ThemeProvider>
  )
}