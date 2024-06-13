import BookList from "@/pages/BookList";
import Homepage from "@/pages/Homepage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  IconBook,
  IconHome,
  IconSearch,
  IconUser,
} from "@tabler/icons-react-native";
import * as React from "react";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <IconHome size={20} color={color} />,
        }}
        component={Homepage}
      />
      <Tab.Screen
        name="My Books"
        options={{
          tabBarIcon: ({ color }) => <IconBook size={20} color={color} />,
        }}
        component={BookList}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <IconSearch size={20} color={color} />,
        }}
        component={BookList}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <IconUser size={20} color={color} />,
        }}
        component={BookList}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
