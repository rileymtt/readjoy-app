import { AppTextField } from "@/components/common/TextIField";
import NewReleaseBook from "@/components/NewReleaseBook";
import { View } from "@/components/Themed";
import AppScrollView from "@/layouts/AppScrollView";
import { useAppSelector } from "@/store/hooks";
import { IconBlockquote } from "@tabler/icons-react-native";
import React from "react";
import { Avatar, Text, TextInput, useTheme } from "react-native-paper";

export default function Homepage() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const { information } = userReducer;
  const { colors } = useTheme();

  return (
    <AppScrollView isMain>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginVertical: 24,
        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri: information?.profilePicture,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text variant="bodySmall">Good morning !</Text>
          <Text variant="bodyMedium" style={{ fontWeight: "900" }}>
            What do you want to read ?
          </Text>
        </View>
        <IconBlockquote size={30} color={colors.primary} />
      </View>
      <AppTextField
        mode="outlined"
        placeholder="Search"
        left={<TextInput.Icon icon="magnify" />}
        style={{
          height: 40,
        }}
        value=""
      />
      <NewReleaseBook />
    </AppScrollView>
  );
}
