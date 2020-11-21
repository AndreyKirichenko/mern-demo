import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
