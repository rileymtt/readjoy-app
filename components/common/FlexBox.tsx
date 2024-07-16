import React from "react";
import { View, ViewProps } from "react-native";

export default function FlexBox(
  props: ViewProps & {
    align?: "center" | "flex-start" | "flex-end";
    justify?:
      | "center"
      | "flex-start"
      | "flex-end"
      | "space-between"
      | "space-around"
      | "space-evenly";
  }
) {
  const { align, justify, style, children, ...otherProps } = props;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: props.align,
          justifyContent: props.justify,
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}
