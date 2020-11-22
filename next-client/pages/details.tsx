import { useState, useCallback, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { LinkCard } from '../components/LinkCard/LinkCard';
import { LinkItem } from '../typings/LinkItem';

const DetailPage = (): JSX.Element | null => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const { request, loading } = useHttp<LinkItem>();
  const [link, setLink] = useState<LinkItem | null>(null);

  const router = useRouter();
  const { linkId } = router.query;

  const getLink = useCallback(async (): Promise<void> => {
    const fetched = await request({
      url: `/api/link/${linkId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (fetched) setLink(fetched as LinkItem);
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (!isAuthenticated) Router.push('/');

  if (loading) {
    return <CircularProgress />;
  }

  if (!link) return null;

  return <LinkCard link={link} />;
};

export default DetailPage;
