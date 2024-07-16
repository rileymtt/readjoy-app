import ForgotPassword from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { CustomBlurView } from "@/routes/BottomTab.routes";
import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function AuthRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => null,
        headerLeftLabelVisible: false,
        headerTintColor: colors.text,
        headerBackground: () => <CustomBlurView />,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
