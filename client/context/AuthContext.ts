import { createContext } from 'react';

import { UseAuth } from '../hooks/auth.hook';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

type ContextProps = UseAuth;

export const AuthContext = createContext<Partial<ContextProps>>({
  isAuthenticated: false,
  login: noop,
  logout: noop,
  token: null,
  userId: null,
});
