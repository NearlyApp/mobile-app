import { ScreenContainer } from "@components/containers";
import { DisplayText } from "@components/typography";
import React from "react";

const HomeScreen: NavScreen<"Home"> = () => {
  return (
    <ScreenContainer>
      <DisplayText>Welcome to Nearly !</DisplayText>
    </ScreenContainer>
  );
};

export default HomeScreen;
