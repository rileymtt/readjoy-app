import { Endpoints } from "@/constants/endpoints";
import { get } from "@/utils/api";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import FlexBox from "./common/FlexBox";
import ReviewStarNumber from "./ReviewStarNumber";

export default function NewReleaseBook() {
  const [books, setBooks] = React.useState<{
    lasted: TBook;
    popular: TBook[];
  }>();
  const [quote, setQuote] = React.useState<TQuote>();
  const { colors } = useTheme();

  React.useEffect(() => {
    get(Endpoints.Popular, setBooks, console.error);
    get(Endpoints.Quote, (data) => setQuote(data), console.error);
  }, []);

  return (
    <View style={styles.container}>
      <FlexBox
        style={{
          gap: 10,
          marginBottom: 24,
        }}
        justify="space-between"
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: colors.tertiary,
              fontWeight: "900",
              marginBottom: 10,
            }}
          >
            NEW BOOK !
          </Text>
          <View>
            <Text
              variant="titleMedium"
              numberOfLines={3}
              style={{ color: colors.primary, fontWeight: "bold" }}
            >
              {books?.lasted.title}
            </Text>
            <Text variant="bodySmall" style={{ marginBottom: 10 }}>
              By {books?.lasted.author}
            </Text>
            <Text variant="bodySmall">
              Categories: {books?.lasted.categories}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: books?.lasted?.image,
            }}
            style={{
              height: 180,
              width: 120,
            }}
            resizeMode="cover"
          />
        </View>
      </FlexBox>
      <Surface style={[styles.quoteContainer]} elevation={2} mode="flat">
        <Text variant="bodySmall" style={{ marginBottom: 10 }}>
          Quote of the day
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: "900" }}>
          {quote?.quote}
        </Text>
        <Text variant="bodySmall" style={{ marginTop: 10, textAlign: "right" }}>
          - {quote?.author} -
        </Text>
      </Surface>
      {books?.popular && (
        <ScrollView
          horizontal={true}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {books?.popular.map((book, index) => (
            <View key={index} style={styles.item}>
              <Image
                source={{
                  uri: book.image,
                }}
                style={{
                  width: "100%",
                  height: 150,
                }}
                resizeMode="cover"
              />
              <View>
                <Text variant="labelSmall" numberOfLines={1}>
                  {book.title}
                </Text>
                <Text variant="bodySmall" numberOfLines={1}>
                  {book.author}
                </Text>
              </View>
              <ReviewStarNumber rate={5} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },
  item: {
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width / 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  quoteContainer: {
    marginVertical: 24,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
});
