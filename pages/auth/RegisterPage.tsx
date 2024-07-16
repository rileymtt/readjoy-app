import { AppButton } from "@/components/common/AppButton";
import { AppCheckbook } from "@/components/common/AppCheckbox";
import FlexBox from "@/components/common/FlexBox";
import { AppTextField } from "@/components/common/TextIField";
import { Text, View } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import { post } from "@/utils/api";
import MessageBox from "@/utils/MessageBox";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  ref: string;
  checked: boolean;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = handleSubmit((data) => {
    post(
      Endpoints.Register,
      {
        email: data.email,
        password: data.password,
        ref: Number(data.ref),
      },
      (data) => {
        MessageBox.showSuccess(`Registered successfully!`);
        navigation.navigate("Login");
      },
      (error) => {
        MessageBox.showError(error.message);
      }
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              left={<TextInput.Icon icon="email" />}
              placeholder="Email"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>
            {errors.email.message}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message:
                "Password must be at least 6 characters and contain at least one",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              left={<TextInput.Icon icon="lock" />}
              placeholder="Password"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "eye-off" : "eye"}
                />
              }
              autoCapitalize="none"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>
            {errors.password.message}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message:
                "Password must be at least 6 characters and contain at least one",
            },
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              left={<TextInput.Icon icon="lock" />}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "eye-off" : "eye"}
                />
              }
              autoCapitalize="none"
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]*$/,
              message: "Invalid referral code",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              left={<TextInput.Icon icon="account" />}
              placeholder={"Referral Code"}
              autoCapitalize="none"
              keyboardType="numeric"
            />
          )}
          name="ref"
        />
        {errors.ref && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>
            {errors.ref.message}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{ required: "You must agree to the terms" }}
          render={({ field: { onChange, value } }) => (
            <FlexBox align="center">
              <AppCheckbook
                status={value ? "checked" : "unchecked"}
                onPress={() => onChange(!value)}
              />
              <Text>I agree to the processing of</Text>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {" "}
                Personal Data
              </Text>
            </FlexBox>
          )}
          name="checked"
        />
        {errors.checked && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>
            {errors.checked.message}
          </Text>
        )}
      </View>
      <AppButton mode="outlined" onPress={handleRegister} style={styles.button}>
        Sign-up
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    marginTop: 30,
    marginBottom: 40,
  },
});
