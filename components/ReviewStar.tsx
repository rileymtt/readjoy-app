import { Endpoints } from "@/constants/endpoints";
import { BookReducerHelper } from "@/store/book/book-reducer";
import { useAppDispatch } from "@/store/hooks";
import { put } from "@/utils/api";
import { IconCarambola } from "@tabler/icons-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function ReviewStar({ book }: { book: TBook }) {
  const currentRate = React.useMemo(() => book.rate, [book]);
  const dispatch = useAppDispatch();

  const handleRate = (rate: number) => {
    dispatch(
      BookReducerHelper.Actions.updateBookAction({
        id: book.id,
        rate,
      })
    );
    put(
      `${Endpoints.Book}/${book.id}`,
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
