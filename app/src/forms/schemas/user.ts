import * as Yup from "yup";

export const userProfileSchema = {
  initialValue: {
    email: "",
    fullName: "",
    profilePicture: "",
    memoryLaneDescription: "",
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    fullName: Yup.string().required("Full name is required"),
    profilePicture: Yup.string().nullable(),
    memoryLaneDescription: Yup.string().nullable(),
  }),
};
