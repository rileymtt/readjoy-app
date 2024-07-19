import AppAvatar from "@/components/AppAvatar";
import FlexBox from "@/components/common/FlexBox";
import { AppTextField } from "@/components/common/TextIField";
import { View } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import { uploadImage } from "@/helpers/upload-images";
import AppScrollView from "@/layouts/AppScrollView";
import { RootStackParamList } from "@/routes/config.routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import userStoreHelper from "@/store/user/user.store.helper";
import { post } from "@/utils/api";
import MessageBox from "@/utils/MessageBox";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile",
  "MyStack"
>;

type FormValues = {
  firstname: string;
  lastname: string;
  profilePicture: string;
};

export default function EditProfile({ navigation }: Props) {
  const userReducer = useAppSelector((state) => state.userReducer);
  const { information } = userReducer;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstname: information?.firstName,
      lastname: information?.lastName,
    },
  });
  const dispatch = useAppDispatch();
  const [newAvatar, setNewAvatar] = React.useState<ImagePickerAsset>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { colors } = useTheme();

  const handleUpdateProfile = handleSubmit(async (data) => {
    setLoading(true);
    if (newAvatar) {
      const imageUrl = await uploadImage(newAvatar);
      data.profilePicture = imageUrl.data.link;
    }
    post(
      Endpoints.Profile,
      { fields: data },
      () => {
        MessageBox.showSuccess("Profile updated");
        navigation.goBack();
        dispatch(userStoreHelper.Actions.getProfile());
        setLoading(false);
      },
      (error) => {
        MessageBox.showError(error.message);
        setLoading(false);
      }
    );
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Profile",
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={handleUpdateProfile}
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
        );
      },
    });
  }, [loading]);

  return (
    <AppScrollView>
      <FlexBox style={{ gap: 16 }} align="center">
        <AppAvatar
          defaultAvatar={information?.profilePicture}
          canEdit
          updateCallback={(uri) => setNewAvatar(uri)}
        />
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="First name"
                autoCapitalize="none"
                mode="flat"
                defaultValue={information?.firstName}
              />
            )}
            name="firstname"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Last name"
                autoCapitalize="none"
                mode="flat"
                defaultValue={information?.lastName}
              />
            )}
            name="lastname"
          />
        </View>
      </FlexBox>
    </AppScrollView>
  );
}
