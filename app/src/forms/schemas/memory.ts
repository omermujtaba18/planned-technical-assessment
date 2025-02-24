import { getLocalDatetime } from "@/lib/utils";
import * as Yup from "yup";

export const createMemorySchema = {
  initialValue: {
    title: "",
    timestamp: getLocalDatetime(),
    description: "",
    files: [] as Array<File>,
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is required"),
    timestamp: Yup.string().required("Timestamp is required"),
    description: Yup.string().required("Description is required"),
    files: Yup.array()
      .of(Yup.string())
      .min(1, "At least one image is required"),
  }),
};
