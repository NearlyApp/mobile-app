import i18n from '@/i18n';
import { Button } from '@components/ui/button';
import Spinner from '@components/ui/loading/spinner';
import { Text } from '@components/ui/text';
import { API_BASE_URL } from '@constants/index';
import { useHealthCheck } from '@modules/health/health.hooks';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HealthGate: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, isError, error, refetch, isFetching } = useHealthCheck();

  if (isLoading) {
    return (
      <SafeAreaView className="flex h-full w-full flex-1 items-center justify-center bg-background">
        <View className="flex -translate-y-1/2 flex-col items-center gap-4">
          <Spinner size="lg" />
          <Text size="bodySm" className="text-muted-foreground">
            {i18n.t('health.checking')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex h-full w-full flex-1 items-center justify-center bg-background px-6">
        <View className="flex -translate-y-1/2 flex-col items-center gap-6">
          <View className="flex flex-col items-center gap-2">
            <Text size="headlineLg" className="text-center text-foreground">
              {i18n.t('health.error.title')}
            </Text>
            <Text size="bodyMd" className="text-center text-muted-foreground">
              {i18n.t('health.error.message')}
            </Text>
            {<Text>{API_BASE_URL}</Text>}
          </View>

          {__DEV__ && (
            <View className="rounded-lg bg-destructive/10 p-4">
              <Text size="bodySm" className="text-center text-destructive">
                {error?.message || 'Unknown error'}
              </Text>
              <Text
                size="bodySm"
                className="mt-2 text-center text-muted-foreground"
              >
                API: {API_BASE_URL}
              </Text>
            </View>
          )}

          <Button
            onPress={() => refetch()}
            disabled={isFetching}
            className="min-w-[150px]"
          >
            <Text className="text-primary-foreground">
              {isFetching
                ? i18n.t('general.loading')
                : i18n.t('health.error.retry')}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return children;
};

export default HealthGate;
