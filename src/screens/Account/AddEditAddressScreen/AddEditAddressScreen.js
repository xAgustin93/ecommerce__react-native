import { useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { addressCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchema } from "./AddEditAddressScreen.form";
import { styles } from "./AddEditAddressScreen.styles";

export function AddEditAddressScreen(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();
  const { user } = useAuth();
  const addressId = params?.addressId;

  useEffect(() => {
    if (addressId) {
      navigation.setOptions({ title: "Editar dirección" });
    } else {
      navigation.setOptions({ title: "Crear dirección" });
    }
  }, []);

  useEffect(() => {
    if (addressId) {
      retriveAddress();
    }
  }, [addressId]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressCtrl.update(addressId, formValue);
        } else {
          await addressCtrl.create(user.id, formValue);
        }
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al crear o editar dirección", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const retriveAddress = async () => {
    const response = await addressCtrl.get(addressId);
    await formik.setFieldValue("title", response.title);
    await formik.setFieldValue("name", response.name);
    await formik.setFieldValue("address", response.address);
    await formik.setFieldValue("postal_code", response.postal_code);
    await formik.setFieldValue("city", response.city);
    await formik.setFieldValue("state", response.state);
    await formik.setFieldValue("country", response.country);
    await formik.setFieldValue("phone", response.phone);
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <View style={styles.container}>
        <TextInput
          label="Titulo"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <TextInput
          label="Nombre y apellidos"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <TextInput
          label="Dirección"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <TextInput
          label="Codigo postal"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("postal_code", text)}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        />
        <TextInput
          label="Poblacion"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <TextInput
          label="Estado"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("state", text)}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <TextInput
          label="Pais"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("country", text)}
          value={formik.values.country}
          error={formik.errors.country}
        />
        <TextInput
          label="Telefono"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
        />

        <Button
          mode="contained"
          style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          {addressId ? "Actualizar dirección" : " Crear dirección"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
