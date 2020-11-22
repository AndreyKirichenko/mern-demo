import React, { useState, useContext } from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import Router from 'next/router';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { CentralBillet } from '../components/CentralBillet/CentralBillet';
import { LinkItem } from '../typings/LinkItem';

type CreateLink = {
  link: LinkItem;
}

const CreatePage = (): JSX.Element => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const { request } = useHttp<CreateLink>();
  const [link, setLink] = useState('');

  const createLink = async (): Promise<void> => {
    const data = await request({
      url: '/api/link/generate',
      method: 'POST',
      body: { from: link },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data && data.link) Router.push(`/details?linkId=${data.link._id}`);
  };

  const submitHandler = (): void => {
    createLink();
  };

  if (!isAuthenticated) Router.push('/');

  return (
    <CentralBillet title="Add link">
      <form>
        <Box mb={4}>
          <TextField
            fullWidth
            label="URL address"
            margin="normal"
            name="link"
            onChange={(event) => setLink(event.target.value)}
            value={link}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              onClick={submitHandler}
              type="submit"
              variant="contained"
            >
              Add Link
            </Button>
          </Box>
        </Box>
      </form>
    </CentralBillet>
  );
};

export default CreatePage;
