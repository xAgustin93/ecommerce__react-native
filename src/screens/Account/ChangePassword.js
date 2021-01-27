import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import StatusBar from "../../components/StatusBar";
import { updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { formStyle } from "../../styles";

export default function ChangePassword() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "Error al cambiar la contraseña";
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
      setLoading(false);
    },
  });

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          label="Nueva contraseña"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          secureTextEntry
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Repetir nueva contraseña"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          secureTextEntry
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar contraseña
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4).required(true),
    repeatPassword: Yup.string()
      .min(4)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
