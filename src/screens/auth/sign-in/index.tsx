import Container, { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import Button from "@components/ui/buttons";
import React, { useMemo } from "react";
import Banner from "../components/Banner";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useAuth from "@hooks/useAuth";
import { SignInForm } from "../components/Form";
import styles from "./styles";
import { COLORS, SPACING, TEXT_STYLES } from "@styles/variables";

const SignInScreen: NavScreen<"SignIn"> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <SignInForm {...{ navigation }} />
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={styles.containerMsg}
      >
        <DisplayText style={[TEXT_STYLES.bodySmall]}>
          Don't have an account ?{" "}
          <DisplayText
            style={[TEXT_STYLES.bodySmall, { color: COLORS.primary }]}
          >
            Sign Up
          </DisplayText>
        </DisplayText>
      </Button>
    </ScreenContainer>
  );
};

export default SignInScreen;
