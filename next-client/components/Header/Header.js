import React from 'react';
import { AppBar, Typography, Toolbar, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { default as  NextLink } from 'next/Link'

import { MobileMenu } from '../MobileMenu/MobileMenu';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';
import { useHeaderMenuList } from './useHeaderMenuList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    cursor: 'pointer',
    flexGrow: 1,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const isUpToSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const list = useHeaderMenuList();

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/">
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
        </NextLink>

        {isUpToSm && <DesktopMenu list={list} />}

        {!isUpToSm && <MobileMenu list={list} />}
      </Toolbar>
    </AppBar>
  );
};