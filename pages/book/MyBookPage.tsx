import FlexBox from "@/components/common/FlexBox";
import { Text, View } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import { RootStackParamList } from "@/routes/config.routes";
import { get } from "@/utils/api";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";

const Item = ({ item, onPress }: { item: TBook; onPress: () => void }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <FlexBox style={{ marginVertical: 8 }}>
        <Image
          source={{
            uri: item.image,
            height: 90,
            width: 60,
          }}
        />
        <View style={[styles.right, { flex: 1 }]}>
          <Text style={[styles.title]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text>{item.author}</Text>
        </View>
      </FlexBox>
    </TouchableOpacity>
    <Divider />
  </>
);

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "MyBooks",
  "MyStack"
>;

export default function MyBookPage({ navigation }: Props) {
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

  const renderItem = ({ item }: { item: TBook }) => {
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {},
  title: {
    fontWeight: 700,
    marginBottom: 6,
  },
  right: {
    padding: 12,
  },
});
