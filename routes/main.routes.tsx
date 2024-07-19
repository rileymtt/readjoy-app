import AddBookPage from "@/pages/book/AddBookPage";
import BookDetailPage from "@/pages/book/BookDetailPage";
import EditBookPage from "@/pages/book/EditBookPage";
import EditProfile from "@/pages/profile/EditProfile";
import BottomTabRoutes from "@/routes/BottomTab.routes";
import { RootStackParamList } from "@/routes/config.routes";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";

const RootStack = createStackNavigator<RootStackParamList>();

export default function MainRoutes() {
  const { colors } = useTheme();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.background,
        },
      }}
    >
      <RootStack.Screen
        name="Main"
        component={BottomTabRoutes}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="BookDetail" component={BookDetailPage} />
      <RootStack.Screen name="UpdateBook" component={EditBookPage} />
      <RootStack.Screen name="AddBook" component={AddBookPage} />
      <RootStack.Screen name="EditProfile" component={EditProfile} />
    </RootStack.Navigator>
  );
}
