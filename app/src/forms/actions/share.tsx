import api from "@/lib/api";

export const getShareAction = (id: string) => {
  return api(false).get(`/share/${id}`);
};
