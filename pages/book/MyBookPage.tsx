import AppleStyleSwipeableRow, {
  ActionButtonProps,
} from "@/components/AppleStyleSwipeableRow";
import FlexBox from "@/components/common/FlexBox";
import { Endpoints } from "@/constants/endpoints";
import { RootStackParamList } from "@/routes/config.routes";
import { get } from "@/utils/api";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconCarambola } from "@tabler/icons-react-native";
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
import { Divider } from "react-native-paper";

interface TBook {
  id: number;
  title: string;
  author: string;
  rate?: number;
  image: string;
}

interface ItemProps {
  item: TBook;
  onPress: () => void;
}

const width = 180;

const Item: React.FC<ItemProps> = ({ item, onPress }) => {
  const rightActions: ActionButtonProps[] = [
    {
      text: "More",
      color: "#C8C7CD",
      x: width * 3,
      onPress: () => console.log("More action pressed"),
    },
    {
      text: "Flag",
      color: "#ffab00",
      x: width * 2,
      onPress: () => console.log("Flag action pressed"),
    },
    {
      text: "Delete",
      color: "#dd2c00",
      x: width,
      onPress: () => console.log("Delete action pressed"),
    },
  ];

  return (
    <AppleStyleSwipeableRow rightActions={rightActions}>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <FlexBox>
          <Image
            source={{
              uri: item.image,
              height: 70,
              width: 50,
            }}
          />
          <View style={[styles.right, { flex: 1 }]}>
            <Text style={[styles.title, styles.text]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.text}>{item.author}</Text>
            {item.rate ? (
              <FlexBox align="center">
                <Text>{item.rate}</Text>
                <IconCarambola
                  fill="#F075AA"
                  color="#F075AA"
                  size={12}
                  style={{ marginLeft: 2 }}
                />
              </FlexBox>
            ) : null}
          </View>
        </FlexBox>
      </TouchableOpacity>
      <Divider />
    </AppleStyleSwipeableRow>
  );
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "MyBooks",
  "MyStack"
>;

const MyBookPage: React.FC<Props> = ({ navigation }) => {
  const [books, setBooks] = React.useState<TBook[]>([]);
  const [selectedId, setSelectedId] = React.useState<number>();
  const [refreshing, setRefreshing] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (refreshing) {
      get(
        Endpoints.Book,
        (data) => {
          setBooks(data);
          setRefreshing(false);
        },
        (error) => {
          console.log(error);
          setRefreshing(false);
        }
      );
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
      data={books}
      renderItem={renderItem}
      extraData={selectedId}
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
    // paddingVertical: 20,
    // marginVertical: 20,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    // paddingHorizontal: 20,
  },
  title: {
    fontWeight: "700",
  },
  text: {
    // marginBottom: 6,
  },
  right: {
    paddingHorizontal: 12,
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
