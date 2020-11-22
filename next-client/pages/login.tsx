import { useEffect, useContext, useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http-new.hook';
import { Redirection } from '../components/Redirection/Redirection';
import { CentralBillet } from '../components/CentralBillet/CentralBillet';
import { Auth } from '../typings/Auth';

const LoginPage = (): JSX.Element => {
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { error, loading, request, clearError } = useHttp<Auth>();

  const { login, isAuthenticated } = useContext(AuthContext);

  const loginHandler = async (): Promise<void> => {
    const data = await request({
      url: '/api/auth/login',
      method: 'POST',
      body: { ...form },
    });

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
      Router.push('/create');
    }
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
    <CentralBillet title="Log In">
      <form>
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
    </CentralBillet>
  );
};

export default LoginPage;
