import FlexBox from "@/components/common/FlexBox";
import { Text, View } from "@/components/Themed";
import AppScrollView from "@/layouts/AppScrollView";
import { RootStackParamList } from "@/routes/config.routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import userStoreHelper from "@/store/user/user.store.helper";
import { logout } from "@/utils/auth";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-paper";

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "Profile",
  "MyStack"
>;

export default function ProfilePage({ navigation }: Props) {
  const user = useAppSelector((state) => state.userReducer);
  const { information } = user;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout();
    navigation.goBack();
    dispatch(userStoreHelper.Actions.handleProfileLogout());
  };

  if (!information) return null;
  return (
    <AppScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <FlexBox justify="space-between" align="center">
          <FlexBox style={{ gap: 16 }} align="center">
            <Avatar.Image
              source={{
                uri: information.profilePicture,
              }}
            />
            <View>
              <Text
                style={[
                  {
                    fontWeight: "bold",
                  },
                ]}
              >
                {information.email}
              </Text>
              <Text>Username: {information.displayName}</Text>
              <Text>
                Joined: {moment(information.createdAt).format("YYYY-MM-DD")}
              </Text>
            </View>
          </FlexBox>
          <Icon source={"chevron-right"} size={30} />
        </FlexBox>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 24 }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({});
