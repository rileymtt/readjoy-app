import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
} from "expo-camera";
import { ImagePickerAsset } from "expo-image-picker";
import { default as React, useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FlexBox from "./common/FlexBox";

function CameraScreen({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (image: ImagePickerAsset) => void;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<any>(null);
  const [type, setType] = useState<CameraType>("back");
  const [capturedImage, setCapturedImage] = useState<ImagePickerAsset>();

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      translateY.value = withTiming(0, { duration: 500 });
    } else {
      translateY.value = withTiming(500, { duration: 500 }, () => {
        runOnJS(onClose)();
      });
    }
  }, [isOpen, translateY, onClose]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCaptureImage = async () => {
    if (cameraRef.current) {
      const photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync();
      //   onSuccess(photo);
      setCapturedImage(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[styles.modalView, animatedStyle]}>
          {capturedImage ? (
            <>
              <Image source={{ uri: capturedImage.uri }} style={styles.image} />
              <FlexBox
                justify="space-between"
                style={{ width: "100%", marginVertical: 50 }}
                align="center"
              >
                <IconButton
                  icon={"close"}
                  mode="contained-tonal"
                  onPress={() => setCapturedImage(undefined)}
                />
                <IconButton
                  icon={"check-bold"}
                  onPress={() => {
                    onSuccess(capturedImage);
                  }}
                  mode="contained-tonal"
                />
              </FlexBox>
            </>
          ) : (
            <>
              <CameraView style={styles.image} facing={type} ref={cameraRef} />
              <FlexBox
                justify="space-between"
                style={{ width: "100%", marginVertical: 50 }}
                align="center"
              >
                <IconButton
                  icon={"close"}
                  mode="contained-tonal"
                  onPress={onClose}
                />
                <IconButton
                  icon={"radiobox-marked"}
                  onPress={handleCaptureImage}
                  size={70}
                />
                <IconButton
                  icon={"camera-flip-outline"}
                  onPress={() => {
                    setType(type === "back" ? "front" : "back");
                  }}
                  mode="contained-tonal"
                />
              </FlexBox>
            </>
          )}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 700,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
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
    backgroundColor: "#fff",
  },
});

export default CameraScreen;
