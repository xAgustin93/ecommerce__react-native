import * as Yup from "yup";

export function initialValues(email) {
  return {
    email,
  };
}

export function validationSchame() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
  });
}
