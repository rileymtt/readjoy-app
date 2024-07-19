import FlexBox from "@/components/common/FlexBox";
import ReviewStarNumber from "@/components/ReviewStarNumber";
import { Endpoints } from "@/constants/endpoints";
import { EBookStatus } from "@/constants/enums";
import { BookStatusIcons } from "@/constants/icons";
import { RootStackParamList } from "@/routes/config.routes";
import { getBooks } from "@/store/book/book-actions";
import { BookReducerHelper } from "@/store/book/book-reducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get } from "@/utils/api";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ItemProps {
  item: TBook;
  onPress: () => void;
}

const Item: React.FC<ItemProps> = ({ item, onPress }) => {
  return (
    <React.Fragment>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <FlexBox>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
          <View style={[styles.right, { flex: 1 }]}>
            <Text style={[styles.title, styles.text]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.text, styles.author]}>{item.author}</Text>
            {item.rate ? <ReviewStarNumber rate={item.rate} /> : null}
            <Text style={[styles.text, styles.description]} numberOfLines={3}>
              {item.description}
            </Text>
            <FlexBox>
              <Chip
                icon={() => (
                  <Icon name={BookStatusIcons[item.status]} size={18} />
                )}
                compact
                mode="outlined"
              >
                {EBookStatus[item.status]}
              </Chip>
            </FlexBox>
          </View>
        </FlexBox>
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "MyBooks",
  "MyStack"
>;

const MyBookPage: React.FC<Props> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const bookStore = useAppSelector((state) => state.bookReducer);
  const { myBooks } = bookStore;

  React.useEffect(() => {
    if (refreshing) {
      dispatch(BookReducerHelper.Actions.getBooks());
      setRefreshing(false);
    }
  }, [refreshing]);

  const renderItem: ListRenderItem<TBook> = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("BookDetail", { id: item.id })}
      />
    );
  };

  return (
    <FlatList
      data={myBooks}
      renderItem={renderItem}
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
  image: {
    height: 180,
    width: 120,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  title: {
    fontWeight: "700",
  },
  author: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 3,
  },
  review: {
    fontSize: 12,
  },
  description: {
    fontSize: 12,
    opacity: 0.5,
    marginVertical: 12,
  },
  text: {},
  right: {
    paddingHorizontal: 10,
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 5,
    overflow: "hidden",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default MyBookPage;
