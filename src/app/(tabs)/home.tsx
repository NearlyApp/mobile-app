import { Text } from '@components/ui/text';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage: NavScreen = () => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className="flex flex-1 flex-col gap-4 p-8"
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default HomePage;
