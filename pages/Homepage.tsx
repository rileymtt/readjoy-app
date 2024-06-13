import NewReleaseBook from "@/components/NewReleaseBook";
import { TextField } from "@/components/Themed";
import { IconBlockquote, IconSearch } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";

export default function Homepage() {
  return (
    <View
      style={{
        padding: 20,
        gap: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri: "https://i1.sndcdn.com/avatars-TkhhwnAkP6V8igZy-6u2g0w-t240x240.jpg",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text variant="bodySmall">Good morning !</Text>
          <Text variant="bodyMedium" style={{ fontWeight: "900" }}>
            What do you want to read ?
          </Text>
        </View>
        <IconBlockquote size={30} />
      </View>
      <View>
        <TextField
          mode="outlined"
          placeholder="Search"
          left={<TextInput.Icon icon={() => <IconSearch />} />}
          style={{
            height: 40,
          }}
        />
      </View>
      <NewReleaseBook />
    </View>
  );
}
