import { useEffect, useContext, useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { error, loading, request, clearError } = useHttp();

  const { login, isAuthenticated } = useContext(AuthContext);

  const loginHandler = async () => {
    console.log('loginHandler');
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });

      login(data.token, data.userId);
      Router.push('/create');
    } catch {}
  };

  useEffect(() => {
    if (error) {
      snackbar.showMessage(error);
    }
    clearError();
  }, [error, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  if (isAuthenticated) {
    setTimeout(() => Router.push('/'), 5000);

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
                You are already authenticated
              </Typography>
              will be redirected after 5 seconds...
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <form>
              <Typography component="h1" variant="h5">
                Login
              </Typography>

              <Box mb={4}>
                <TextField
                  fullWidth
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onChange={changeHandler}
                  required
                  value={form.email}
                />

                <TextField
                  autoComplete="current-password"
                  fullWidth
                  id="standard-password-input"
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={changeHandler}
                  required
                  type="password"
                  value={form.password}
                />
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="primary"
                  disabled={loading}
                  onClick={loginHandler}
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

LoginPage.getInitialProps = () => ({});

export default LoginPage;