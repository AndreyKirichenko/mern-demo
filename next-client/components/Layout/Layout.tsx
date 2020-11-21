import React, { ReactNode } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import { AuthContext } from '../../context/AuthContext';
import { Header } from '../Header/Header';
import { useAuth } from '../../hooks/auth.hook';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(12),
  },
}));

interface LayoutProps {
  children: React.ReactNode | null;
}

const Layout = ({ children = null }: LayoutProps): JSX.Element => {
  const classes = useStyles();

  const { login, logout, token, userId, ready } = useAuth();

  if (!ready) {
    return <CircularProgress />;
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      isAuthenticated,
    }}
    >
      <Head>
        <title>My page title</title>
      </Head>

      <Header />

      <main className={classes.main}>
        <Container>
          {children}
        </Container>
      </main>
    </AuthContext.Provider>

  );
};

export default Layout;
