import RestrictedGuard from '@components/guards/restricted-guard';
import PublishForm from '@components/publish/publish-form';
import { Button } from '@components/ui/button';
import { X } from 'lucide-react-native';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const PublishPage: NavScreen = ({ navigation }) => {
  const submitButtonRef = useRef<React.ReactNode>(null);

  const updateNavigationOptions = useCallback(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} variant="ghost" size="icon">
          <X />
        </Button>
      ),
      headerTitle: '',
      headerRight: () => submitButtonRef.current,
      headerShown: true,
    });
  }, [navigation]);

  const handleSubmitButtonReady = useCallback(
    (button: React.ReactElement) => {
      submitButtonRef.current = button;
      updateNavigationOptions();
    },
    [updateNavigationOptions],
  );

  useLayoutEffect(() => {
    updateNavigationOptions();
  }, [updateNavigationOptions]);

  return (
    <RestrictedGuard navigation={navigation}>
      <SafeAreaView edges={['left', 'right', 'bottom']} className="flex-1 p-4">
        <PublishForm onSubmitButtonReady={handleSubmitButtonReady} />
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
