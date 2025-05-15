import axiosInstance from "../axios-instance";

export const deleteUser = async () => {
  const { data } = await axiosInstance.delete(`/users`);

  return data;
};
