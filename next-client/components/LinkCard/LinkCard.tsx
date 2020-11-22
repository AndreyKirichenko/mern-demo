import { LinkItem } from '../../typings/LinkItem';

interface LinkCardProps {
  link: LinkItem;
}

export const LinkCard = ({ link }: LinkCardProps): JSX.Element => (
  <>
    <h2>Link</h2>

    <p>Original: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
    <p>Shorted: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
    <p>Clicked: <strong>{link.clicks}</strong></p>
    <p>Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
  </>
);
