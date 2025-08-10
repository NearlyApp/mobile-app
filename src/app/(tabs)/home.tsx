import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import useSignOut from '@hooks/auth/useSignOut';
import useCurrentUser from '@hooks/users/useCurrentUser';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const { data: user } = useCurrentUser();
  const signOut = useSignOut();

  function handleSignOut() {
    signOut.mutate();
  }

  return (
    <SafeAreaView className="flex flex-col gap-4 p-8">
      <Text>Home Screen</Text>
      {!!user && (
        <Button onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
