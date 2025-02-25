import api from "@/lib/api";

export const getShareUserAction = (id: string) => {
  return api(false).get(`/share/users/${id}`);
};

export const getShareMemoriesAction = (
  id: string,
  page: number = 1,
  limit: number = 2,
) => {
  return api(false).get(
    `/share/users/${id}/memories?page=${page}&limit=${limit}`,
  );
};
