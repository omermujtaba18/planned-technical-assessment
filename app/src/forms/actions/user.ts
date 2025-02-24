import api from "@/lib/api";
import { base64ToFile } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

export const getUserAction = () => {
  api()
    .get("/users/me")
    .then(
      (data) => {
        useUserStore.getState().setUser(data.data);
      },
      (error) => {
        console.log(error);
      },
    );
};

interface PatchUserAction {
  fullName: string;
  profilePicture: string;
  memoryLaneDescription: string;
}

export const patchUserAction = (data: PatchUserAction, actions) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("memoryLaneDescription", data.memoryLaneDescription);

  if (data.profilePicture && data.profilePicture.startsWith("data:image")) {
    const file = base64ToFile(data.profilePicture, "profile.jpg");
    formData.append("profilePicture", file);
  }

  actions.setSubmitting(true);

  api()
    .patch("/users/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(
      (data) => {
        useUserStore.getState().setUser(data.data);
        actions.setSubmitting(false);
      },
      (error) => {
        actions.setSubmitting(false);
        actions.setStatus(error.response.data);
      },
    );
};
