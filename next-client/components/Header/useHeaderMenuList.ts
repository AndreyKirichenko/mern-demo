import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AUTHENTICATED_LIST = [
  {
    title: 'Create',
    href: '/create',
  },
  {
    title: 'Log out',
    href: '/logout',
  },
];

const NOT_AUTHENTICATED_LIST = [
  {
    title: 'Login',
    href: '/login',
  },
  {
    title: 'Register',
    href: '/register',
  },
];

export const useHeaderMenuList = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? AUTHENTICATED_LIST : NOT_AUTHENTICATED_LIST;
}
