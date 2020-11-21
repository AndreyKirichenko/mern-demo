import { ReactNode } from 'react';
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
  children?: ReactNode | null;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const classes = useStyles();

  const auth = useAuth();
  const { ready } = auth;

  if (!ready) {
    return <CircularProgress />;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Head>
        <title>My page title</title>
      </Head>

      <Header />

      <main className={classes.main}>
        <Container>
          {/* Something wrong for children in Container */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {children}
        </Container>
      </main>
    </AuthContext.Provider>

  );
};

export default Layout;
