import i18n from '@/i18n';
import { Text } from '@components/ui/text';
import { cn } from '@lib/utils';
import { ClassValue } from 'clsx';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IProps {
  className?: ClassValue;
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<IProps> = ({ className, size = 'lg' }) => {
  const indicatorSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'small';
      case 'md':
        return 30;
      case 'lg':
      default:
        return 'large';
    }
  }, [size]);

  const textSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'bodySm';
      case 'md':
        return 'bodyMd';
      case 'lg':
      default:
        return 'bodyLg';
    }
  }, [size]);

  return (
    <View className={cn('flex h-fit w-fit flex-col gap-2', className)}>
      <ActivityIndicator size={indicatorSize} />
      <Text size={textSize}>{i18n.t('general.loading')}</Text>
    </View>
  );
};

export default Spinner;
