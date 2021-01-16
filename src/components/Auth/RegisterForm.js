import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";

export default function RegisterForm(props) {
  const { setShowLogin } = props;

  const showLogin = () => setShowLogin((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await registerApi(formData);
        console.log("OK");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        label="Contraseña"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <TextInput
        label="Repetir contraseña"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
      >
        Registrarse
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={showLogin}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
