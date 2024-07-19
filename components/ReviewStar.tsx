import { Endpoints } from "@/constants/endpoints";
import { BookReducerHelper } from "@/store/book/book-reducer";
import { useAppDispatch } from "@/store/hooks";
import { put } from "@/utils/api";
import { IconCarambola } from "@tabler/icons-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import FlexBox from "./common/FlexBox";

export default function ReviewStar({ book }: { book: TBook }) {
  const currentRate = React.useMemo(() => book.rate, [book]);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

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
    <FlexBox
      style={{
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.tertiary,
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
            fill={i <= currentRate ? colors.tertiaryContainer : "#fff"}
            color={colors.tertiary}
            size={17}
            style={{ margin: 7 }}
          />
        </TouchableOpacity>
      ))}
    </FlexBox>
  );
}
