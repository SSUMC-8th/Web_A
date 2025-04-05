import axiosInstance from "./axios-instance";

export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/uploads/public", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data.imageUrl; // ⬅️ 이게 핵심!
};
