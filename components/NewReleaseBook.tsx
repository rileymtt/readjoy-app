import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import ReviewStar from "./ReviewStar";

export default function NewReleaseBook() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [books, setBooks] = React.useState<TBook[]>([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/book`);
      const data = await res.json();
      setBooks(data);
    })();
  }, []);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginTop: 24,
        // alignItems: "stretch",
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          height: "100%",
          //   justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#F075AA", fontWeight: "900", marginBottom: 10 }}>
          NEW BOOK !
        </Text>
        <View>
          <Text style={{ color: "blue" }}>NAVAL RAVIKANT</Text>
          <Text style={{ color: "blue" }}>{books[0]?.title}</Text>
          <Text style={{ marginBottom: 10 }}>By ERIC JOGENSON</Text>
          <Text>Thể loại: Phát triển cá nhân, Kinh doanh, Triết học</Text>
        </View>
        <ReviewStar />
      </View>
      <View
        style={{
          flex: 0.5,
        }}
      >
        <Image
          source={{
            uri: books[0]?.image,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: 200,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
