import ForgotPassword from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function AuthRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitle: () => null,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
