import AppBookImage from "@/components/AppBookImage";
import BookStatus from "@/components/BookStatus";
import FlexBox from "@/components/common/FlexBox";
import ReviewStar from "@/components/ReviewStar";
import { Text } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import AppScrollView from "@/layouts/AppScrollView";
import { RootStackParamList } from "@/routes/config.routes";
import { useAppSelector } from "@/store/hooks";
import { _delete } from "@/utils/api";
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
  const bookStore = useAppSelector((state) => state.bookReducer);
  const { myBooks } = bookStore;

  React.useEffect(() => {
    const find = myBooks.find((book) => book.id === route.params.id);
    setData(find);
  }, [myBooks]);

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
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.author}>{data.author}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <ReviewStar book={data} />
      <BookStatus book={data} />
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  author: {
    fontStyle: "italic",
    marginBottom: 12,
  },
  description: {
    opacity: 0.5,
  },
});
