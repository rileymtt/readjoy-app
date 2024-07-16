import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";

const TestCamera: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MlkitOcrResult>();

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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const { uri } = result.assets[0];
      setImageUri(uri);
      performOcr(uri);
    }
  };

  const performOcr = async (uri: string) => {
    setLoading(true);
    (async () => {
      const resultFromUri = await MlkitOcr.detectFromUri(uri);
      setResult(resultFromUri);
      // for (const iterator of resultFromUri) {
      //   console.log(iterator.text);
      // }
    })();
  };

  const extractBookInfo = (text: string) => {
    const lines = text.split("\n");
    const title = lines[0] || "Title not found";
    const author = lines[1] || "Author not found";
    return { title, author };
  };

  const { title, author } = extractBookInfo(extractedText);

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={requestPhotoPermission} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Title: {title}</Text>
          <Text>Author: {author}</Text>
        </View>
      )}
      {result?.map((item, index) => (
        <Text key={index}>{item.text}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: 200,
    height: 300,
  },
});

export default TestCamera;
