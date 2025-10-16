import { Text } from '@components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsPage: NavScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text>Settings Screen</Text>
    </SafeAreaView>
  );
};

export default SettingsPage;
