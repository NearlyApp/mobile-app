import RestrictedGuard from '@components/guards/RestrictedGuard';
import PublishForm from '@components/publish/PublishForm';
import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import { X } from 'lucide-react-native';
import { useLayoutEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const PublishPage: NavScreen = ({ navigation }) => {
  const formRef = useRef<Nullable<{ onSubmit: () => void }>>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} variant="ghost">
          <X />
        </Button>
      ),
      headerTitle: '',
      headerRight: () => (
        <Button onPress={() => formRef.current?.onSubmit()}>
          <Text>Publish</Text>
        </Button>
      ),
      headerShown: true,
    });
  }, [navigation]);

  return (
    <RestrictedGuard navigation={navigation}>
      <SafeAreaView edges={['left', 'right', 'bottom']} className="flex-1 p-4">
        <PublishForm ref={formRef} />
      </SafeAreaView>
    </RestrictedGuard>
  );
};

PublishPage.options = {
  presentation: 'modal',
  headerLeft: () => null,
  headerTitle: '',
  headerRight: () => null,
  headerShown: true,
};

export default PublishPage;
