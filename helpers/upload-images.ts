import { Endpoints } from "@/constants/endpoints";
import { postWithFormData } from "@/utils/api";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export function uploadImage(
  file: ImagePicker.ImagePickerAsset
): Promise<{ data: { link: string } }> {
  return new Promise((resolve, reject) => {
    if (!file) return null;

    var body: any = new FormData();

    body.append("images", {
      name: "name",
      type: file.type,
      uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
    });

    postWithFormData(
      Endpoints.UploadS3,
      body,
      (data) => {
        resolve({ data: { link: data[0] } });
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}
