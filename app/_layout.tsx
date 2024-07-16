import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-reanimated";
import { Provider } from "react-redux";
import App from "./_app";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    console.log("loaded", loaded);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle="dark-content" // Use default bar style
          hidden={false} // Ensure the status bar is visible
        />
        <App />
        <FlashMessage />
      </ThemeProvider>
    </Provider>
  );
}
