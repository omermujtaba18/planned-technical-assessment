import axios from "axios";
import { getCookie } from "cookies-next";

const api = (withAuth: boolean = true) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...(withAuth && {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }),
  });

export default api;
