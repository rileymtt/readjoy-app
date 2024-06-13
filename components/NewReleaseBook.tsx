import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import ReviewStar from "./ReviewStar";

export default function NewReleaseBook() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
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
          <Text style={{ color: "blue" }}>Để thịnh vượng và hạnh phúc</Text>
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
            uri: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320548114i/6280379.jpg",
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
