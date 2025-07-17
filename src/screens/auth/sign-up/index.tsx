import { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import React from "react";

const SignUpScreen: NavScreen<"SignUp"> = () => {
  return (
    <ScreenContainer>
      <DisplayText>SignUp screen</DisplayText>
    </ScreenContainer>
  );
};

export default SignUpScreen;
