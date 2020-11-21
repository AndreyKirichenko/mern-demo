import { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { Redirection } from '../components/Redirection/Redirection';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
  }
}));

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    logout();

    const timeout = setTimeout(() => {
      Router.push('/');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <Redirection title="Logging out!" />;
};

export default LogoutPage;
