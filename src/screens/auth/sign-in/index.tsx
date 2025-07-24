import Container from '@components/containers';
import Banner from '@screens/auth/sign-in/components/Banner';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const SignInScreen: NavScreen<'SignIn'> = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Banner />
      <View style={styles.content}></View>
    </Container>
  );
};

export default SignInScreen;
