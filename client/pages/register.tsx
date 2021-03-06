import { useContext, useEffect, useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Router from 'next/router';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Head from 'next/head';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Redirection } from '../components/Redirection/Redirection';
import { CentralBillet } from '../components/CentralBillet/CentralBillet';

const RegisterPage = (): JSX.Element => {
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { error, loading, request, clearError } = useHttp();

  const { isAuthenticated } = useContext(AuthContext);

  const registerHandler = async (): Promise<void> => {
    const data = await request({
      url: '/api/auth/register',
      method: 'POST',
      body: { ...form },
    });

    if (data && data.message) snackbar.showMessage(data.message);

    setTimeout(() => {
      Router.push('/login');
    }, 5000);
  };

  useEffect(() => {
    if (error) {
      snackbar.showMessage(error);
    }
    clearError();
  }, [error, clearError]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  if (isAuthenticated) {
    setTimeout(() => Router.push('/'), 5000);

    return <Redirection title="You are already authenticated" />;
  }

  return (
    <CentralBillet title="Registration">
      <Head>Registration</Head>

      <form>
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
            type="submit"
          >
            Sign up
          </Button>
        </Box>
      </form>
    </CentralBillet>
  );
};

export default RegisterPage;
