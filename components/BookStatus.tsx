import { Endpoints } from "@/constants/endpoints";
import { BookStatusIcons } from "@/constants/icons";
import { BookReducerHelper } from "@/store/book/book-reducer";
import { useAppDispatch } from "@/store/hooks";
import { put } from "@/utils/api";
import MessageBox from "@/utils/MessageBox";
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomIcon = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.iconContainer}>
    <Icon name={icon} size={20} />
    <Text style={styles.iconLabel}>{label}</Text>
  </View>
);

const BookStatus = ({ book }: { book: TBook }) => {
  const [value, setValue] = React.useState(book.status.toString());
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  React.useEffect(() => {
    dispatch(
      BookReducerHelper.Actions.updateBookAction({
        id: book.id,
        status: Number(value),
      })
    );
    put(
      `${Endpoints.Book}/${book.id}`,
      { status: Number(value) },
      () => {},
      (error) => {
        MessageBox.showError(error.message);
      }
    );
  }, [value]);

  const buttons = [
    {
      value: "0",
      label: "New",
      icon: BookStatusIcons[0],
    },
    {
      value: "1",
      icon: BookStatusIcons[1],
      label: "Owned",
    },
    {
      value: "2",
      icon: BookStatusIcons[2],
      label: "Reading",
    },
    {
      value: "3",
      icon: BookStatusIcons[3],
      label: "Read",
    },
  ];

  const modifiedButtons = buttons.map((button) => ({
    value: button.value,
    icon: () => <CustomIcon icon={button.icon} label={button.label} />,
    style: {
      backgroundColor:
        button.value === value ? colors.secondaryContainer : colors.onSecondary,
    },
  }));

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={modifiedButtons}
        density="small"
        style={styles.segmentedButtons}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  segmentedButtons: {
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 3,
  },
});

export default BookStatus;
