import { AppTextField } from "@/components/common/TextIField";
import NewReleaseBook from "@/components/NewReleaseBook";
import { View } from "@/components/Themed";
import AppScrollView from "@/layouts/AppScrollView";
import { useAppSelector } from "@/store/hooks";
import { IconBlockquote, IconSearch } from "@tabler/icons-react-native";
import React from "react";
import { Avatar, Text, TextInput } from "react-native-paper";

export default function Homepage({ navigation }: { navigation: any }) {
  const { userReducer } = useAppSelector((state) => state);
  const { information } = userReducer;

  return (
    <AppScrollView isMain>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginBottom: 24,
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
        <IconBlockquote size={30} color="#4F8EF7" />
      </View>
      <AppTextField
        mode="outlined"
        placeholder="Search"
        left={<TextInput.Icon icon={() => <IconSearch />} />}
        style={{
          height: 40,
        }}
      />
      <NewReleaseBook />
    </AppScrollView>
  );
}
