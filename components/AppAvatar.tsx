import { useTheme } from "@react-navigation/native";
import { IconCamera } from "@tabler/icons-react-native";
import {
  ImagePickerAsset,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

type TProps = {
  defaultAvatar?: string;
  canEdit?: boolean;
  updateCallback?: (image: ImagePickerAsset) => void;
};

export default function AppAvatar(props: TProps) {
  const theme = useTheme();
  const [avatar, setAvatar] = React.useState<ImagePickerAsset>({
    uri: props.defaultAvatar,
  } as ImagePickerAsset);

  const requestPhotoPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to give photo permission to use this feature."
      );
    } else {
      selectImage();
    }
  };

  const selectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const image = result.assets[0];
      setAvatar(image);
      if (props.updateCallback) {
        props.updateCallback(image);
      }
    }
  };

  if (props.canEdit) {
    return (
      <TouchableOpacity
        onPress={requestPhotoPermission}
        style={styles.container}
      >
        <Avatar.Image
          source={{
            uri: avatar.uri,
          }}
        />
        <IconCamera
          style={[styles.absoluteCenter]}
          color={theme.colors.background}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Avatar.Image
      source={{
        uri: avatar.uri,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: {
    position: "absolute",
  },
});
