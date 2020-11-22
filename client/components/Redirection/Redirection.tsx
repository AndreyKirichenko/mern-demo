import { CentralBillet } from '../CentralBillet/CentralBillet';

interface RedirectionProps {
  title: string;
}

export const Redirection = ({ title }: RedirectionProps): JSX.Element => (
  <CentralBillet title={title}>
    will be redirected after 5 seconds...
  </CentralBillet>
);
