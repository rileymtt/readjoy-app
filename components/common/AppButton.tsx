import { Button, ButtonProps as DefaultProps } from "react-native-paper";
import { useThemeColor } from "../Themed";

export type ButtonProps = ThemeProps & DefaultProps;

export function AppButton(props: ButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: "transparent", dark: darkColor },
    "background"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Button
      style={[{ backgroundColor }, style]}
      {...otherProps}
      textColor={color}
    />
  );
}
