import { useTheme } from "@react-navigation/native";
import { IconCamera } from "@tabler/icons-react-native";
import {
  ImagePickerAsset,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "./Themed";

type TProps = {
  defaultImage?: string;
  canEdit?: boolean;
  updateCallback?: (image: ImagePickerAsset) => void;
};

export default function AppBookImage(props: TProps) {
  const [image, setImage] = React.useState<ImagePickerAsset>({
    uri: props.defaultImage,
  } as ImagePickerAsset);
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const requestPhotoPermission = async () => {
    if (!props.canEdit) return;
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
      setImage(image);
      if (props.updateCallback) {
        props.updateCallback(image);
      }
    }
  };

  return (
    <TouchableOpacity onPress={requestPhotoPermission}>
      <View style={styles.container}>
        {image.uri ? (
          <React.Fragment>
            {/* {loading && (
              <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
            )} */}
            <Image
              source={{ uri: image.uri }}
              style={[
                styles.image,
                // { display: loading ? "none" : "flex" }
              ]}
              onLoadEnd={handleLoad}
              onError={() => setLoading(false)}
            />
          </React.Fragment>
        ) : (
          <IconCamera size={30} color={theme.colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    width: 200,
    height: 300,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  absoluteCenter: {
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});
