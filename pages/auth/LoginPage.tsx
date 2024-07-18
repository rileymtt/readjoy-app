import { AppButton } from "@/components/common/AppButton";
import { AppCheckbook } from "@/components/common/AppCheckbox";
import FlexBox from "@/components/common/FlexBox";
import { AppTextField } from "@/components/common/TextIField";
import { Text, View } from "@/components/Themed";
import { Endpoints } from "@/constants/endpoints";
import { useAppDispatch } from "@/store/hooks";
import { StoreUserHelper } from "@/store/user/userReducer";
import { post } from "@/utils/api";
import { setAccessToken } from "@/utils/auth";
import MessageBox from "@/utils/MessageBox";
import { Link } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
const image = require("../../assets/images/logo-large.png");

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = handleSubmit((data) => {
    post(
      Endpoints.Login,
      data,
      async (data) => {
        await setAccessToken(data.accessToken);
        dispatch(StoreUserHelper.Actions.getProfile());
      },
      (error) => {
        MessageBox.showError(error.message);
      }
    );
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={image}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <Text style={styles.title}>Welcome Back</Text>
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
        <FlexBox justify="space-between" align="center">
          <FlexBox align="center">
            <AppCheckbook
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
            <Text>Remember me</Text>
          </FlexBox>
          <Link
            to={{
              screen: "ForgotPassword",
            }}
          >
            <Text style={styles.link}>Forgot password?</Text>
          </Link>
        </FlexBox>
        <AppButton
          mode="outlined"
          onPress={handleRegister}
          style={styles.button}
        >
          Sign-in
        </AppButton>
        <FlexBox justify="center">
          <Text>Don't have an account?</Text>
          <Link
            to={{
              screen: "Register",
            }}
          >
            <Text style={styles.link}> Sign-up</Text>
          </Link>
        </FlexBox>
      </View>
    </SafeAreaView>
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
    marginTop: 20,
    marginBottom: 40,
  },
  link: {
    fontWeight: "bold",
  },
});
