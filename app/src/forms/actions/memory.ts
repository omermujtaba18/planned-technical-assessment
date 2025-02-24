import api from "@/lib/api";
import { useMemoryStore } from "@/store/memoryStore";
import { useUIStore } from "@/store/uiStore";
import { FormikHelpers } from "formik";

export const getMemoriesAction = async (
  page: number = 1,
  limit: number = 2,
) => {
  api()
    .get(`/memories?page=${page}&limit=${limit}`)
    .then(
      (response) => {
        const { data, totalItems, totalPages, currentPage } = response.data;
        useMemoryStore.getState().addMemories(data);
        useMemoryStore
          .getState()
          .setPaging({ totalItems, totalPages, currentPage });
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

export const deleteMemoryAction = (id: string) => {
  api()
    .delete(`/memories/${id}`)
    .then(
      () => {
        useMemoryStore.getState().deleteMemory(id);
      },
      (error) => {
        console.log(error);
      },
    );
};
