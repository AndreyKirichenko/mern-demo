import { useEffect, useContext } from 'react';
import Router from 'next/router';

import { AuthContext } from '../context/AuthContext';
import { Redirection } from '../components/Redirection/Redirection';

const LogoutPage = (): JSX.Element => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // TODO: Cannot invoke an object which is possibly 'undefined'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
