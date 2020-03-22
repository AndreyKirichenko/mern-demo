import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import { Header } from './Header';
import theme from '../theme';

const useStyles = makeStyles(theme => ({
  main: {
    minHeight: '100vh',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(12),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
      <>
        <Head>
          <title>My page title</title>
        </Head>

        <Header />

        <main className={classes.main}>
          <Container>
            {children}
          </Container>
        </main>
      </>

  );
};

export default Layout;
