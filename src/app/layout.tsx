import '@styles/global.css';

import TabsLayout from '@app/(tabs)/layout';
import PublishPage from '@app/publish';
import HealthGate from '@components/guards/health-gate';
import ReactQueryProvider from '@components/ReactQueryProvider';
import ROUTES from '@constants/routes';
import { NAV_THEME } from '@constants/theme';
import { useColorScheme } from '@hooks/useColorScheme';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const RootStack = createNativeStackNavigator();

const RootLayout: React.FC = () => {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <SafeAreaProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <HealthGate>
            <NavigationContainer>
              <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen
                  name={ROUTES.tabs()}
                  component={TabsLayout}
                  options={TabsLayout.options}
                />
                <RootStack.Screen
                  name={ROUTES.publish()}
                  component={PublishPage}
                  options={PublishPage.options}
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </HealthGate>
        </ThemeProvider>
      </SafeAreaProvider>
    </ReactQueryProvider>
  );
};

export default RootLayout;
