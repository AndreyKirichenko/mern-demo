import React, { useState, useContext, useCallback, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

import { LinkList } from '../components/LinkList/LinkList';

const LinksPage = (): JSX.Element => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      // TODO: specify request
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fetched = await request('/api/link/', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks(fetched);

      // eslint-disable-next-line no-empty
    } catch {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <CircularProgress />;
  }

  return <LinkList links={links} />;
};

export default LinksPage;
