import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [refresh, setRefresh] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Expense Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Dashboard />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;