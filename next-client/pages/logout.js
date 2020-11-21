import { useEffect, useContext } from 'react';
import { Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles( theme => ({
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

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Log Out
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogoutPage;
