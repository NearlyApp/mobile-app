import { SafeAreaView } from 'react-native-safe-area-context';

const DiscoverPage: NavScreen = () => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className="flex-1"
    ></SafeAreaView>
  );
};

export default DiscoverPage;
