import AppBookImage from "@/components/AppBookImage";
import FlexBox from "@/components/common/FlexBox";
import ReviewStar from "@/components/ReviewStar";
import { Text } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import AppScrollView from "@/layouts/AppScrollView";
import { RootStackParamList } from "@/routes/config.routes";
import { _delete, get } from "@/utils/api";
import MessageBox from "@/utils/MessageBox";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconEdit, IconTrash } from "@tabler/icons-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "BookDetail",
  "MyStack"
>;

export default function BookDetailPage({ route, navigation }: Props) {
  const [data, setData] = React.useState<TBook>();

  React.useEffect(() => {
    get(
      Endpoints.Book + "/" + route.params.id,
      (data) => setData(data),
      (error) => console.log(error)
    );
  }, []);

  React.useEffect(() => {
    const handleGoToEdit = () => {
      if (!data) return;
      navigation.navigate("UpdateBook", { book: data });
    };

    const handleGoToDelete = () => {
      _delete(
        `${Endpoints.Book}/${route.params.id}`,
        {},
        () => {
          MessageBox.showSuccess("Book deleted successfully");
          navigation.goBack();
        },
        (error) => {
          MessageBox.showError(error.message);
        }
      );
    };

    navigation.setOptions({
      title: "Book Detail",
      headerRight: () => (
        <FlexBox style={{ marginRight: 20, gap: 8 }}>
          <TouchableOpacity onPress={handleGoToEdit}>
            <IconEdit color={"#4F8EF7"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToDelete}>
            <IconTrash color={"#4F8EF7"} />
          </TouchableOpacity>
        </FlexBox>
      ),
    });
  }, [data]);

  if (!data) return null;
  return (
    <AppScrollView isMain>
      <AppBookImage defaultImage={data.image} />
      <Text>{data.title}</Text>
      <Text>{data.author}</Text>
      <Text>{data.description}</Text>
      <ReviewStar id={data.id} rate={data.rate} />
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
  },
});
