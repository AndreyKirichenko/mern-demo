import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Container, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { useAuth } from '../hooks/auth.hook';
import { useHttp } from '../hooks/http.hook';

const useStyles = makeStyles( theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const [ form, setForm ] = useState({
    email: '',
    password: '',
  });
  
  const { error, loading, request, clearError } = useHttp();

  const auth = useAuth();

  const loginHandler = async () => {
    console.log('loginHandler');
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  useEffect(() => {
    if(error) {
      snackbar.showMessage(error);
    }
    clearError();
  }, [error, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
              Login
            </Typography>

            <Box mb={4}>
              <TextField
                required
                name="email"
                label="E-mail"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={changeHandler}
              />

              <TextField
                required
                id="standard-password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={changeHandler}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={loginHandler}
              >
                Sign in
              </Button> 
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

LoginPage.getInitialProps = () => {
  return {};
};

export default LoginPage;
