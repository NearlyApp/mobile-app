import { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import Button from "@components/ui/buttons";
import { useAuth } from "@hooks/useAuth";
import React from "react";

const HomeScreen: NavScreen<"Home"> = () => {
  const { user, clearUser } = useAuth();

  return (
    <ScreenContainer>
      <DisplayText>Welcome to Nearly !</DisplayText>
      {user && <DisplayText>Hello, {user.username}!</DisplayText>}
      <Button onPress={clearUser}>Logout</Button>
    </ScreenContainer>
  );
};

export default HomeScreen;
