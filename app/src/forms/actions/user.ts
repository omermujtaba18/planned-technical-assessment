import api from "@/lib/api";
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
