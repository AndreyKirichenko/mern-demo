import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export interface ListItem {
  href: string;
  title: string;
}

const AUTHENTICATED_LIST: ListItem[] = [
  {
    href: '/create',
    title: 'Create',
  },
  {
    href: '/logout',
    title: 'Log out',
  },
];

const NOT_AUTHENTICATED_LIST: ListItem[] = [
  {
    href: '/login',
    title: 'Login',
  },
  {
    href: '/register',
    title: 'Register',
  },
];

export const useMainMenuList = (): ListItem[] => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? AUTHENTICATED_LIST : NOT_AUTHENTICATED_LIST;
};
