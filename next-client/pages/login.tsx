import { useEffect, useContext, useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Redirection } from '../components/Redirection/Redirection';
import { CentralBillet } from '../components/CentralBillet/CentralBillet';

const LoginPage = (): JSX.Element => {
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { error, loading, request, clearError } = useHttp();

  const { login, isAuthenticated } = useContext(AuthContext);

  // TODO: specify Promise
  const loginHandler = async (): Promise<unknown> => {
    try {
      // TODO: specify request
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await request('/api/auth/login', 'POST', { ...form });

      // TODO: Cannot invoke an object which is possibly 'undefined'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      login(data.token, data.userId);

      Router.push('/create');

      return data;
    // eslint-disable-next-line no-empty
    } catch {}
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
