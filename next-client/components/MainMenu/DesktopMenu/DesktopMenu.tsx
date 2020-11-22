import { Button } from '@material-ui/core';

// eslint-disable-next-line import/no-unresolved
import Link from 'next/Link';
import { useMainMenuList } from '../useMainMenuList';

export const DesktopMenu = (): JSX.Element => {
  const list = useMainMenuList();

  return (
    <div>
      {list.map((item) => (
        <Link key={item.title} href={item.href}>
          <Button component="a" color="inherit">{item.title}</Button>
        </Link>
      ))}
    </div>
  );
};
