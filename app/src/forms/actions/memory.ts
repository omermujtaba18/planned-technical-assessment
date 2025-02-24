import api from "@/lib/api";
import { useMemoryStore } from "@/store/memoryStore";
import { useUIStore } from "@/store/uiStore";
import { FormikHelpers } from "formik";

export const getMemoriesAction = () => {
  api()
    .get("/memories")
    .then(
      (data) => {
        useMemoryStore.getState().setMemories(data.data);
      },
      (error) => {
        console.log(error);
      },
    );
};

interface CreateMemoryActionDto {
  title: string;
  timestamp: string;
  description: string;
  files: Array<File>;
}

export const createMemoryAction = (
  data: CreateMemoryActionDto,
  actions: FormikHelpers<CreateMemoryActionDto>,
) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("timestamp", data.timestamp);
  formData.append("description", data.description);
  data.files.forEach((file) => {
    formData.append("files", file);
  });

  api()
    .post("/memories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(
      (data) => {
        useMemoryStore.getState().createMemory(data.data);
        useUIStore.getState().setUI({ memoryDialog: { state: false } });
      },
      (error) => {
        actions.setSubmitting(false);
        actions.setStatus(error.response.data);
      },
    );
};
