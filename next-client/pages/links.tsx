import React, { useState, useContext, useCallback, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Router from 'next/router';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { LinkList } from '../components/LinkList/LinkList';

const LinksPage = (): JSX.Element => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp<[]>();

  const { isAuthenticated, token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    const fetched = await request({
      url: '/api/link/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLinks(fetched);
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (!isAuthenticated) Router.push('/');

  if (loading) {
    return <CircularProgress />;
  }

  return <LinkList links={links} />;
};

export default LinksPage;
