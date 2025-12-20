import Spinner from '@components/ui/loading/spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

const FullScreenLoader: React.FC = () => (
  <SafeAreaView className="flex h-full w-full flex-1 items-center justify-center">
    <Spinner className="-translate-y-1/2" size="lg" />
  </SafeAreaView>
);

export default FullScreenLoader;
