import Container from '@components/containers';
import { DisplayText } from '@components/ui/typography';
import useSignOut from '@hooks/auth/useSignOut';
import useCurrentUser from '@hooks/users/useCurrentUser';
import React from 'react';
import { Button } from 'react-native';

const HomeScreen: NavScreen<'Home'> = () => {
  const { data: user } = useCurrentUser();
  const signOut = useSignOut();

  function handleSignOut() {
    signOut.mutate();
  }

  return (
    <Container>
      <DisplayText>Welcome to Nearly !</DisplayText>
      {user && <DisplayText>Hello, {user.username}!</DisplayText>}
      {user && <Button onPress={handleSignOut} title="Sign Out" />}
    </Container>
  );
};

export default HomeScreen;
