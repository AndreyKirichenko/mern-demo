import { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import Router from 'next/router';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Redirection } from '../components/Redirection/Redirection';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { error, loading, request, clearError } = useHttp();

  const { isAuthenticated } = useContext(AuthContext);

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });

      snackbar.showMessage(data.message);

      setTimeout(() => {
        Router.push('/');
      }, 5000);
    // eslint-disable-next-line no-empty
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

    return <Redirection title="You are already authenticated" />;
  }

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
              Registration
            </Typography>

            <Box mb={4}>
              <TextField
                fullWidth
                id="email"
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
                onClick={registerHandler}
                variant="contained"
              >
                Sign up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
