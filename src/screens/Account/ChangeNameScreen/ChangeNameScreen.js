import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { userCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchema } from "./ChangeNameScreen.form";
import { styles } from "./ChangeNameScreen.styles";

export function ChangeNameScreen() {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.update(user.id, formValue);
        updateUser("firstname", formValue.firstname);
        updateUser("lastname", formValue.lastname);
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al actualizar los datos", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("firstname", text)}
        value={formik.values.firstname}
        error={formik.errors.firstname}
      />
      <TextInput
        label="Apellidos"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Cambiar nombre y apellidos
      </Button>
    </View>
  );
}
