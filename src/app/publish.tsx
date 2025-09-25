import AuthGuard from '@components/guards/AuthGuard';
import PublishForm from '@components/publish/PublishForm';
import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { useNavigation, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { useLayoutEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const PublishScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const formRef = useRef<Nullable<{ onSubmit: () => void }>>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => router.push(ROUTES.home())} variant="ghost">
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
  }, [navigation, router]);

  return (
    <AuthGuard>
      <SafeAreaView className="flex-1">
        <PublishForm ref={formRef} />
      </SafeAreaView>
    </AuthGuard>
  );
};

export default PublishScreen;
