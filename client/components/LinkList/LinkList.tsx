// eslint-disable-next-line import/no-unresolved
import Link from 'next/Link';

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { LinkItem } from '../../typings/LinkItem';

interface LinkListProps {
  links: LinkItem[];
}

export const LinkList = ({ links }: LinkListProps): JSX.Element => {
  if (!links.length) {
    return <p className="center">Link list is empty</p>;
  }

  return (
    <Paper>
      <Toolbar>
        <Typography
          component="h1"
          variant="h5"
        >
          Links
        </Typography>
      </Toolbar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Original</TableCell>
              <TableCell>Shorted</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {links.map((link, index) => link && (
              <TableRow key={link._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{link.from}</TableCell>
                <TableCell>{link.to}</TableCell>
                <TableCell>
                  <Link href={`/details?linkId=${link._id}`}>
                    <Button>Open</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
