import AppBookImage from "@/components/AppBookImage";
import { AppTextField } from "@/components/common/TextIField";
import LoadingModal from "@/components/LoadingModal";
import { Endpoints } from "@/constants/endpoints";
import { uploadImage } from "@/helpers/upload-images";
import AppScrollView from "@/layouts/AppScrollView";
import { RootStackParamList } from "@/routes/config.routes";
import { BookReducerHelper } from "@/store/book/book-reducer";
import { useAppDispatch } from "@/store/hooks";
import { post } from "@/utils/api";
import MessageBox from "@/utils/MessageBox";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";
import { Text, TextInput, useTheme } from "react-native-paper";

type FormValues = {
  title: string;
  author: string;
  description: string;
  image: string;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddBook",
  "MyStack"
>;

function AddBookPage({ navigation }: Props) {
  const [imageUri, setImageUri] = useState<ImagePicker.ImagePickerAsset>();
  const [extractedText, setExtractedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MlkitOcrResult>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      title: "Add Book",
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(handleAddBook)}
          disabled={loading}
          style={{ marginRight: 20 }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: 500,
            }}
            variant="bodyLarge"
          >
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [handleSubmit, loading, imageUri]);

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
      const image = result.assets[0];
      setImageUri(image);
      performOcr(image.uri);
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

  const handleAddBook = async (data: FormValues) => {
    setLoading(true);
    if (imageUri) {
      try {
        const updateImage = await uploadImage(imageUri);
        data.image = updateImage.data.link;
        post(
          Endpoints.Book,
          data,
          () => {
            dispatch(BookReducerHelper.Actions.getBooks());
            MessageBox.showSuccess("Book added successfully");
            setLoading(false);
            navigation.goBack();
          },
          (error) => {
            MessageBox.showError(error.message);
            setLoading(false);
          }
        );
      } catch (error: any) {
        MessageBox.showError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <AppScrollView isMain>
      <View style={styles.container}>
        {loading && <LoadingModal />}
        <AppBookImage canEdit updateCallback={(e) => setImageUri(e)} />
        <View>
          <Controller
            control={control}
            rules={{
              required: "Title is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={<TextInput.Icon icon="book" />}
                placeholder="Title"
                autoCapitalize="none"
              />
            )}
            name="title"
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={<TextInput.Icon icon="account-edit" />}
                placeholder="Author"
                autoCapitalize="none"
              />
            )}
            name="author"
          />
          {errors.author && (
            <Text style={styles.errorText}>{errors.author.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={<TextInput.Icon icon="text" />}
                placeholder="Description"
                autoCapitalize="none"
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}
        </View>
      </View>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 24,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
});

export default AddBookPage;
