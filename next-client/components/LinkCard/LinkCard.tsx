import { LinkItem } from '../../typings/LinkItem';
import { CentralBillet } from '../CentralBillet/CentralBillet';

interface LinkCardProps {
  link: LinkItem;
}

export const LinkCard = ({ link }: LinkCardProps): JSX.Element => (
  <CentralBillet title="Link">
    <p>Original: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
    <p>Shorted: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
    <p>Clicked: <strong>{link.clicks}</strong></p>
    <p>Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
  </CentralBillet>
);
