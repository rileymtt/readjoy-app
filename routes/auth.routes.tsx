import ForgotPassword from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();
export default function AuthRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitle: () => null,
        headerBackTitle: "Back",
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
