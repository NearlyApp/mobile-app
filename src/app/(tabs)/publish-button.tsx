import ROUTES from '@constants/routes';
import { Redirect } from 'expo-router';

const PublishButtonScreen: React.FC = () => (
  <Redirect href={ROUTES.publish()} />
);

export default PublishButtonScreen;
