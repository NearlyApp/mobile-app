import * as VARIABLES from "@styles/variables";
import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function useContainerPaddingHorizontal() {
  const { width } = useWindowDimensions();
  const isTablet = width >= VARIABLES.BREAKPOINTS.mobileL;
  return isTablet ? VARIABLES.SPACING.large : VARIABLES.SPACING.medium;
}

type ContainerProps = ViewProps & Options;
type ScrollContainerProps = ScrollViewProps & Options;

type Options = {
  includeSafeArea?: boolean;
};

const SafeArea: React.FC = () => {
  const insets = useSafeAreaInsets();

  return <View style={[styles.safeArea, { height: insets.bottom }]} />;
};

const Container: React.FC<ContainerProps> = ({
  children,
  includeSafeArea = true,
  ...props
}) => {
  const paddingHorizontal = useContainerPaddingHorizontal();

  return (
    <View
      {...props}
      style={[
        includeSafeArea ? styles.containerWithSafeArea : styles.container,
        { paddingHorizontal },
        props.style,
      ]}
    >
      {children}

      {includeSafeArea && <SafeArea />}
    </View>
  );
};

export const ScreenContainer: React.FC<ContainerProps> = ({
  children,
  includeSafeArea = true,
  ...props
}) => {
  return (
    <Container
      {...props}
      includeSafeArea={includeSafeArea}
      style={[props.style, { paddingTop: VARIABLES.SPACING.xxxLarge }]}
    >
      {children}
    </Container>
  );
};

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  includeSafeArea = true,
  ...props
}) => {
  const paddingHorizontal = useContainerPaddingHorizontal();

  return (
    <ScrollView
      {...props}
      style={[
        includeSafeArea ? styles.containerWithSafeArea : styles.container,
        { paddingHorizontal },
        props.style,
      ]}
    >
      {children}

      {includeSafeArea && <SafeArea />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: VARIABLES.SPACING.medium,
  },
  containerWithSafeArea: {
    paddingTop: VARIABLES.SPACING.medium,
  },
  safeArea: {
    marginTop: VARIABLES.SPACING.medium,
  },
});

export default Container;
