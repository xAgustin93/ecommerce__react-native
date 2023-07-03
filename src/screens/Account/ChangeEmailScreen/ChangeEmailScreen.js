import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { userCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchame } from "./ChangeEmailScreen.form";
import { styles } from "./ChangeEmailScreen.styles";

export function ChangeEmailScreen() {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(user.email),
    validationSchema: validationSchame(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.update(user.id, formValue);
        updateUser("email", formValue.email);
        navigation.goBack();
      } catch (error) {
        Toast.show("Error a actualizar los datos", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Correo electronico"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Cambiar email
      </Button>
    </View>
  );
}
