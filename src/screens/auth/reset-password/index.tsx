import { ScrollContainer } from '@components/containers';
import { DisplayText } from '@components/ui/typography';
import useUsers from '@hooks/users/useUsers';
import React from 'react';
import { Text } from 'react-native';

const ResetPasswordScreen: NavScreen<'ResetPassword'> = () => {
  const { data } = useUsers();

  return (
    <ScrollContainer>
      <DisplayText>Reset password</DisplayText>
      <Text>{!!data && JSON.stringify(data, null, 2)}</Text>
    </ScrollContainer>
  );
};

export default ResetPasswordScreen;
