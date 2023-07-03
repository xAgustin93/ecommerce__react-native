import * as Yup from "yup";

export function initialValues() {
  return {
    name: "Agustin",
    number: "4242424242424242",
    exp_month: "11",
    exp_year: "39",
    cvc: "123",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().min(6, true).required(true),
    number: Yup.string().min(16, true).max(16, true).required(true),
    exp_month: Yup.string().min(2, true).max(2, true).required(true),
    exp_year: Yup.string().min(2, true).max(2, true).required(true),
    cvc: Yup.string().min(3, true).max(3, true).required(true),
  });
}
