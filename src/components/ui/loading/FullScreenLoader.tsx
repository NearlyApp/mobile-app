import Spinner from '@components/ui/loading/spinner';
import { View } from 'react-native';

const FullScreenLoader: React.FC = () => (
  <View className="flex h-full w-full flex-1 items-center justify-center">
    <Spinner className="-translate-y-1/2" size="lg" />
  </View>
);

export default FullScreenLoader;
