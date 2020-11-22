import React from 'react';
import { AppBar, Typography, Toolbar, useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/Link';

import { DesktopMenu, MobileMenu } from '../MainMenu/MainMenu';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    cursor: 'pointer',
    flexGrow: 1,
  },
}));

export const Header = (): JSX.Element => {
  const classes = useStyles();
  const isUpToSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <AppBar>
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
        </Link>

        {isUpToSm && <DesktopMenu />}

        {!isUpToSm && <MobileMenu />}
      </Toolbar>
    </AppBar>
  );
};
