import { Button } from '@material-ui/core';

import { default as NextLink } from 'next/Link';
import { useMainMenuList } from '../useMainMenuList';

export const DesktopMenu = (): JSX.Element => {
  const list = useMainMenuList();

  return (
    <div>
      {list.map((item) => (
        <NextLink key={item.title} href={item.href}>
          <Button component="a" color="inherit">{item.title}</Button>
        </NextLink>
      ))}
    </div>
  );
};
