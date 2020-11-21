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
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.paper} align="center">
            <Typography
              component="h1"
              variant="h5"
              align="center"
            >
              Logging out!
            </Typography>
            will be redirected after 5 seconds...
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogoutPage;
