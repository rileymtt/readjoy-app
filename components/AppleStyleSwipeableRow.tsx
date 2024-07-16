import React, { PropsWithChildren, useRef } from "react";
import { Animated, I18nManager, StyleSheet, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export interface ActionButtonProps {
  text: string;
  color: string;
  x: number;
  onPress: () => void;
}

interface SwipeableRowProps extends PropsWithChildren<unknown> {
  leftActions?: ActionButtonProps[];
  rightActions?: ActionButtonProps[];
}

const AppleStyleSwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  leftActions = [],
  rightActions = [],
}) => {
  const swipeableRowRef = useRef<Swipeable>(null);

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<any>,
    dragX: Animated.AnimatedInterpolation<any>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: "clamp",
    });
    return leftActions.map((action, index) => (
      <RectButton
        key={index}
        style={[styles.leftAction, { backgroundColor: action.color }]}
        onPress={action.onPress}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {action.text}
        </Animated.Text>
      </RectButton>
    ));
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<any>,
    onPress: () => void
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View
        key={text}
        style={{ flex: 1, transform: [{ translateX: trans }] }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<any>
  ) => (
    <View
      style={{
        width: 80 * rightActions.length,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {rightActions.map((action) =>
        renderRightAction(
          action.text,
          action.color,
          action.x,
          progress,
          action.onPress
        )
      )}
    </View>
  );

  const close = () => {
    swipeableRowRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      // onSwipeableOpen={(direction) => {
      //   console.log(`Opening swipeable from the ${direction}`);
      // }}
      // onSwipeableClose={(direction) => {
      //   console.log(`Closing swipeable to the ${direction}`);
      // }}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default AppleStyleSwipeableRow;
