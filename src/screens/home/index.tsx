import { ScreenContainer } from '@components/containers';
import { DisplayText } from '@components/typography';
import useSession from '@hooks/useSession';
import React, { useEffect } from 'react';

const HomeScreen: NavScreen<'Home'> = () => {
  const { data: user } = useSession();
  console.log('User data:', user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <ScreenContainer>
      <DisplayText>Welcome to Nearly !</DisplayText>
      {user && <DisplayText>Hello, {user.username}!</DisplayText>}
      {/* <Button onPress={clearUser}>Logout</Button> */}
    </ScreenContainer>
  );
};

export default HomeScreen;
