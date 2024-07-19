import { mainColorLight } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet } from "react-native";
import { View } from "./Themed";

export default function LoadingModal() {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <ActivityIndicator
          animating={true}
          color={mainColorLight}
          size={"large"}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});
