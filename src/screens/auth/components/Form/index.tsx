import Container from "@components/containers";
import Button from "@components/ui/buttons";
import { FieldCheckbox, FieldText } from "@components/ui/fields/index";
import { StackParamList } from "@custom-types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SPACING } from "@styles/variables";
import { FC, useState } from "react";
import styles from "./styles";
import { useMutation } from "@tanstack/react-query";
import { post } from "@lib/queries";
import { FormErrorToast, useToast } from "@components/ui/toast";
import { FormError } from "@lib/queries/error";
import { useAuth } from "@hooks/useAuth";
import { User } from "@custom-types/user";

interface SignInFormProps {
  navigation: NativeStackNavigationProp<StackParamList, "SignIn", undefined>;
}
export const SignInForm: FC<SignInFormProps> = ({ navigation }) => {
  const { toast } = useToast();
  const { saveUser } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const mutation = useMutation({
    mutationKey: ["signIn", login, password, rememberMe],
    mutationFn: async () =>
      post<User>("/auth/sign-in/", { login, password, rememberMe }),
    onSuccess: (data) => {
      saveUser(data);
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
        variant: "success",
      });
      navigation.navigate("Home");
    },
    onError: (error) => {
      if (error instanceof FormError) {
        toast(FormErrorToast(error));
      } else {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  return (
    <Container>
      <FieldText placeholder="Login" value={login} onChangeText={setLogin} />
      <FieldText
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Container style={styles.row} includeSafeArea={false}>
        <FieldCheckbox
          value={rememberMe}
          onChange={setRememberMe}
          label="Remember me"
        />

        <Button onPress={() => navigation.navigate("ResetPassword")}>
          Forgot Password
        </Button>
      </Container>
      <Button
        style={{ marginTop: SPACING.medium }}
        variant="primary"
        disabled={!login || !password || mutation.isPending}
        onPress={mutation.mutate}
      >
        Sign In
      </Button>
    </Container>
  );
};
