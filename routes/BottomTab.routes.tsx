import MyBookPage from "@/pages/book/MyBookPage";
import Homepage from "@/pages/Homepage";
import ProfilePage from "@/pages/profile/ProfilePage";
import { useAppSelector } from "@/store/hooks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { IconBook, IconHome, IconPlus } from "@tabler/icons-react-native";
import { TouchableOpacity } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { RootStackParamList } from "./config.routes";

const Tab = createBottomTabNavigator<RootStackParamList>();

function BottomTabRoutes({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const user = useAppSelector((state) => state.userReducer);
  const { information } = user;
  const { colors } = useTheme();

  const bottomConfig: {
    name: keyof RootStackParamList;
    title: string;
    icon: any;
    component: any;
    headerRight?: () => JSX.Element;
  }[] = [
    {
      name: "Home",
      icon: IconHome,
      component: Homepage,
      title: "Home",
    },
    {
      name: "MyBooks",
      title: "My Books",
      icon: IconBook,
      component: MyBookPage,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddBook");
          }}
          style={{
            padding: 10,
          }}
        >
          <IconPlus size={20} color={colors.primary} />
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      {bottomConfig.map((item, key) => (
        <Tab.Screen
          name={item.name}
          options={{
            tabBarIcon: ({ color }) => <item.icon size={24} color={color} />,
            headerRight: item.headerRight,
            title: item.title,
          }}
          component={item.component}
          key={key}
        />
      ))}
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: () => (
            <Avatar.Image
              source={{
                uri: information?.profilePicture,
              }}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabRoutes;
