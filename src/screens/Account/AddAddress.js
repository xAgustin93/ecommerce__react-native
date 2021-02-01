import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import StatusBar from "../../components/StatusBar";
import {
  addAddressApi,
  getAddressApi,
  updateAddressApi,
} from "../../api/address";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { formStyle } from "../../styles";

export default function AddAddress(props) {
  const {
    route: { params },
  } = props;
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState(true);
  const { auth } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idAddress) {
        const response = await getAddressApi(auth, params.idAddress);
        await formik.setFieldValue("_id", response._id);
        await formik.setFieldValue("title", response.title);
        await formik.setFieldValue("name_lastname", response.name_lastname);
        await formik.setFieldValue("address", response.address);
        await formik.setFieldValue("postal_code", response.postal_code);
        await formik.setFieldValue("city", response.city);
        await formik.setFieldValue("state", response.state);
        await formik.setFieldValue("country", response.country);
        await formik.setFieldValue("phone", response.phone);
        setNewAddress(false);
      }
    })();
  }, [params]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        if (newAddress) await addAddressApi(auth, formData);
        else await updateAddressApi(auth, formData);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <KeyboardAwareScrollView extraScrollHeight={25}>
        <View style={styles.container}>
          <Text style={styles.title}>Nueva dirección</Text>
          <TextInput
            label="Titulo"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("title", text)}
            value={formik.values.title}
            error={formik.errors.title}
          />
          <TextInput
            label="Nombre y apellidos"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("name_lastname", text)}
            value={formik.values.name_lastname}
            error={formik.errors.name_lastname}
          />
          <TextInput
            label="Dirección"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("address", text)}
            value={formik.values.address}
            error={formik.errors.address}
          />
          <TextInput
            label="Codigo Postal"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("postal_code", text)}
            value={formik.values.postal_code}
            error={formik.errors.postal_code}
          />
          <TextInput
            label="Poblacion"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("city", text)}
            value={formik.values.city}
            error={formik.errors.city}
          />
          <TextInput
            label="Estado"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("state", text)}
            value={formik.values.state}
            error={formik.errors.state}
          />
          <TextInput
            label="Pais"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("country", text)}
            value={formik.values.country}
            error={formik.errors.country}
          />
          <TextInput
            label="Telefono"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("phone", text)}
            value={formik.values.phone}
            error={formik.errors.phone}
            keyboardType="number-pad"
          />
          <Button
            mode="contained"
            style={[formStyle.btnSucces, styles.btnSucces]}
            onPress={formik.handleSubmit}
            loading={loading}
          >
            {newAddress ? "Crear dirección" : "Actualizar dirección"}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastname: Yup.string().required(true),
    address: Yup.string().required(true),
    postal_code: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    country: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
  },
  btnSucces: {
    marginBottom: 20,
  },
  keyboard: { flex: 1, flexDirection: "column", justifyContent: "center" },
});
