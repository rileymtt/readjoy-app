import { IconCarambola } from "@tabler/icons-react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import FlexBox from "./common/FlexBox";

export default function ReviewStarNumber({ rate }: { rate: number }) {
  const { colors } = useTheme();
  return (
    <FlexBox align="center">
      <Text variant="bodySmall">{rate}</Text>
      <IconCarambola
        fill={colors.errorContainer}
        color={colors.tertiary}
        size={12}
        style={{ marginLeft: 2 }}
      />
    </FlexBox>
  );
}
