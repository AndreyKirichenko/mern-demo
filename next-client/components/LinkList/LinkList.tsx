import Link from 'next/Link';

import { LinkItem } from '../../typings/LinkItem';

interface LinkListProps {
  links: LinkItem[];
}

export const LinkList = ({ links }: LinkListProps): JSX.Element => {
  if (!links.length) {
    return <p className="center">Link list is empty</p>;
  }

  return (
    <>
      <h2>Links</h2>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>Shorted</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => link && (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link href={`/detail/${link._id}`}>
                  <a>Open</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
