import { IconCarambola } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";

export default function ReviewStar() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#F075AA",
        borderRadius: 50,
        width: 170,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <IconCarambola
        fill={"#F075AA"}
        color="#F075AA"
        size={17}
        style={{ margin: 7 }}
      />
      <IconCarambola
        fill={"#F075AA"}
        color="#F075AA"
        size={17}
        style={{ margin: 7 }}
      />
      <IconCarambola
        fill={"#F075AA"}
        color="#F075AA"
        size={17}
        style={{ margin: 7 }}
      />
      <IconCarambola
        fill={"#F075AA"}
        color="#F075AA"
        size={17}
        style={{ margin: 7 }}
      />
      <IconCarambola
        fill={"#F075AA"}
        color="#F075AA"
        size={17}
        style={{ margin: 7 }}
      />
    </View>
  );
}
