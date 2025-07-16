import Container, { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import Button from "@components/ui/buttons";
import React from "react";

const SignInScreen: NavScreen<"SignIn"> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <DisplayText>SignIn screen</DisplayText>
      <Container includeSafeArea={false}>
        <Button
          children="Don't have an account? Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </Container>
    </ScreenContainer>
  );
};

export default SignInScreen;
