import { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import React from "react";

const ResetPasswordScreen: NavScreen<"ResetPassword"> = () => {
  return (
    <ScreenContainer>
      <DisplayText>Reset password</DisplayText>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;
