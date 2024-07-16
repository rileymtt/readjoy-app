import { Endpoints } from "@/constants/endpoints";
import { put } from "@/utils/api";
import { IconCarambola } from "@tabler/icons-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function ReviewStar({ rate, id }: { rate: number; id: number }) {
  const [currentRate, setCurrentRate] = React.useState<number>(rate);

  const handleRate = (rate: number) => {
    setCurrentRate(rate);
    put(
      `${Endpoints.Book}/${id}`,
      { rate },
      () => {},
      (error) => console.log(error)
    );
  };

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
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity onPress={() => handleRate(i)} key={i}>
          <IconCarambola
            fill={i <= currentRate ? "#F075AA" : "#fff"}
            // color={i <= currentRate ? "#F075AA" : "#F075AA"}
            color="#F075AA"
            size={17}
            style={{ margin: 7 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
