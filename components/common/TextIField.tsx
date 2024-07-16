import { TextInput, TextInputProps } from "react-native-paper";

export function AppTextField(props: TextInputProps) {
  const { style, ...otherProps } = props;
  return (
    <TextInput
      style={[{ backgroundColor: "transparent", textAlign: "auto" }, style]}
      outlineStyle={{
        borderWidth: 1,
        borderRadius: 500,
      }}
      mode="outlined"
      dense
      {...otherProps}
    />
  );
}
