import { useState, useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { LinkCard } from '../components/LinkCard/LinkCard';
import { LinkItem } from '../typings/LinkItem';

const DetailPage = (): JSX.Element => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState<LinkItem>(null);

  const router = useRouter();
  const { linkId } = router.query;

  console.log('router.query', router.query);

  // TODO: specify event  type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getLink = useCallback(async (): Promise<unknown> => {
    try {
      // TODO: specify request
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);

      return fetched;
      // eslint-disable-next-line no-empty
    } catch {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {link && <LinkCard link={link} />}
    </>
  );
};

export default DetailPage;
