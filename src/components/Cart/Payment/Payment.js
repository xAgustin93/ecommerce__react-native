import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { orderCtrl } from "../../../api";
import { useAuth, useCart } from "../../../hooks";
import { ENV, screensName } from "../../../utils";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchema } from "./Payment.form";
import { styles } from "./Payment.styles";

const stripe = require("stripe-client")(ENV.STRIPE.PUBLISHEBLE_KEY);

export function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { emptyCart } = useCart();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const result = await stripe.createToken({ card: formValue });

        if (result?.error) {
          Toast.show(result.error.message, {
            position: Toast.positions.CENTER,
          });
        } else {
          const response = await orderCtrl.payment(
            result.id,
            user.id,
            products,
            selectedAddress
          );

          if (size(response) > 0) {
            await emptyCart();
            navigation.navigate(screensName.account.root, {
              screen: screensName.account.order,
            });
          } else {
            new Error("Error al realizar el pedido");
          }
        }
      } catch (error) {
        Toast.show("Error al realizar el pago", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forma de pago</Text>

      <TextInput
        label="Nombre del titular"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de tarjeta"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />

      <View style={styles.inputGroup}>
        <View style={styles.viewMonthYearInputs}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Pagar {totalPayment && `(${totalPayment.toFixed(2)}€)`}
      </Button>
    </View>
  );
}
