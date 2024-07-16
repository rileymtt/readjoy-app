import AddBookPage from "@/pages/book/AddBookPage";
import BookDetailPage from "@/pages/book/BookDetailPage";
import EditBookPage from "@/pages/book/EditBookPage";
import EditProfile from "@/pages/profile/EditProfile";
import BottomTabRoutes from "@/routes/BottomTab.routes";
import { RootStackParamList } from "@/routes/config.routes";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator<RootStackParamList>();

export default function MainRoutes() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={BottomTabRoutes}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="BookDetail"
        component={BookDetailPage}
        options={{
          headerBackTitle: "Back",
        }}
      />
      <RootStack.Screen
        name="UpdateBook"
        component={EditBookPage}
        options={{
          headerBackTitle: "Back",
        }}
      />
      <RootStack.Screen
        name="AddBook"
        component={AddBookPage}
        options={{
          headerBackTitle: "Back",
        }}
      />
      <RootStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerBackTitle: "Back",
        }}
      />
    </RootStack.Navigator>
  );
}
