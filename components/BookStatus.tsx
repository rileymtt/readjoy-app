import { BookStatusIcons } from "@/constants/icons";
import * as React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomIcon = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.iconContainer}>
    <Icon name={icon} size={20} />
    <Text style={styles.iconLabel}>{label}</Text>
  </View>
);

const BookStatus = () => {
  const [value, setValue] = React.useState("");

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
