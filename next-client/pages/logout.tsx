import { useEffect, useContext } from 'react';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { Redirection } from '../components/Redirection/Redirection';

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();

    const timeout = setTimeout(() => {
      Router.push('/');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <Redirection title="Logging out!" />;
};

export default LogoutPage;
