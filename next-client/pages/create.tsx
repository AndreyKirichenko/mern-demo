import React, { useState, useContext } from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import Router from 'next/router';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { CentralBillet } from '../components/CentralBillet/CentralBillet';

const CreatePage = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  // TODO: specify Promise type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const createLink = async (): Promise<unknown> => {
    try {
      // TODO: specify request
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await request('/api/link/generate', 'POST', { from: link }, {
        Authorization: `Bearer ${auth.token}`,
      });

      setTimeout(() => Router.push(`/details/${data.link._id}`), 5000);

      return data;
    // eslint-disable-next-line no-empty
    } catch {}
  };

  // TODO: specify event type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pressHandler = async (event): void => {
    if (event.key === 'Enter') createLink();
  };

  const submitHandler = (): void => {
    createLink();
  };

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
            onKeyPress={pressHandler}
            value={link}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              type="submit"
              variant="contained"
              onClick={submitHandler}
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
