import { useTheme } from "@react-navigation/native";
import { Checkbox, CheckboxProps as DefaultProps } from "react-native-paper";

export type ButtonProps = ThemeProps & DefaultProps;

export function AppCheckbook(props: ButtonProps) {
  const theme = useTheme();

  return <Checkbox.Android color={theme.colors.primary} {...props} />;
}
