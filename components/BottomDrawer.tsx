import React, { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AppButton } from "./common/AppButton";

const BottomDrawer = ({
  isOpen,
  onClose,
  children,
}: ViewProps & {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(300, { duration: 300 }, () => {
        runOnJS(onClose)();
      });
    }
  }, [isOpen, translateY, onClose]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback
          onPress={() =>
            (translateY.value = withTiming(300, { duration: 300 }, () =>
              runOnJS(onClose)()
            ))
          }
        >
          <View style={styles.space} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modalView, animatedStyle]}>
          <View style={styles.content}>{children}</View>
          <AppButton
            style={styles.button}
            onPress={() =>
              (translateY.value = withTiming(300, { duration: 300 }, () =>
                runOnJS(onClose)()
              ))
            }
          >
            Cancel
          </AppButton>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  space: {
    flex: 1,
    width: "100%",
  },
  modalView: {
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default BottomDrawer;
