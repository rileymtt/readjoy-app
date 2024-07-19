import { CustomPaperColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { Provider } from "react-redux";
import App from "./_app";

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

  const theme = {
    ...DefaultTheme,
    colors:
      colorScheme === "dark" ? CustomPaperColors.dark : CustomPaperColors.light,
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="dark-content" // Use default bar style
          hidden={false} // Ensure the status bar is visible
        />
        <App />
        <FlashMessage />
      </PaperProvider>
    </Provider>
  );
}
