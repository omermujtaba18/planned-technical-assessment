import * as Yup from "yup";

export const loginSchema = {
  initialValue: { email: "", password: "" },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
};

export const signupSchema = {
  initialValue: { fullName: "", email: "", password: "" },
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(10, "Password must be at least 10 characters long")
      .required("Password is required"),
  }),
};
