import { useState } from 'react';
import { Box, Button, Drawer, List, ListItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { default as NextLink } from 'next/Link';

import { useMainMenuList } from '../useMainMenuList';

const useStyles = makeStyles({
  list: {
    width: '100vw',
  },
  listItem: {
    justifyContent: 'center',
  },
});

export const MobileMenu = (): JSX.Element => {
  const classes = useStyles();
  const list = useMainMenuList();

  const [isOpenDrawer, setDrawer] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const toggleDrawer = (event): void => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;

    setDrawer(!isOpenDrawer);
  };

  return (
    <>
      <IconButton
        aria-label="menu"
        color="inherit"
        edge="start"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={toggleDrawer}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List
            className={classes.list}
          >
            {list.map(item => (
              <ListItem key={item.title} className={classes.listItem}>
                <NextLink href={item.href}>
                  <Button component="a" color="inherit">{item.title}</Button>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};
