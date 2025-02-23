import { FormikHelpers } from "formik";
import { deleteCookie, setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import api from "@/lib/api";

interface LoginActionDto {
  email: string;
  password: string;
}

export const loginAction = (
  data: LoginActionDto,
  actions: FormikHelpers<LoginActionDto>,
) => {
  actions.setSubmitting(true);

  api(false)
    .post("/auth/login", data)
    .then(
      (data) => {
        actions.setSubmitting(false);
        setCookie("token", data.data.access_token, { maxAge: 86400 });
        redirect("/");
      },
      (error) => {
        actions.setSubmitting(false);
        actions.setStatus(error.response.data);
      },
    );
};

interface SignupActionDto {
  fullName: string;
  email: string;
  password: string;
}

export const signupAction = (
  data: SignupActionDto,
  actions: FormikHelpers<SignupActionDto>,
) => {
  actions.setSubmitting(true);

  api(false)
    .post("/auth/signup", data)
    .then(
      (data) => {
        actions.setSubmitting(false);
        setCookie("token", data.data.access_token, { maxAge: 86400 });
        redirect("/");
      },
      (error) => {
        actions.setSubmitting(false);
        actions.setStatus(error.response.data);
      },
    );
};

export const logoutAction = () => {
  deleteCookie("token");
  redirect("/login");
};
